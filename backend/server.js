const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const log = {
  info: (msg, data) => console.log(`[INFO] ${msg}`, data || ''),
  error: (msg, data) => console.error(`[ERROR] ${msg}`, data || ''),
  warn: (msg, data) => console.warn(`[WARN] ${msg}`, data || '')
};

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('JWT_SECRET not set in environment variables');
  process.exit(1);
}

const CSRF_SECRET = process.env.CSRF_SECRET || 'csrf-secret-key';

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-education')
.then(() => {
  log.info('MongoDB connected successfully');
})
.catch(err => {
  log.error('MongoDB connection error:', err.message);
  log.warn('Running without database - some features may not work');
});

// User schema with validation
const userSchema = new mongoose.Schema({
  mobile: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: 'Invalid mobile number format'
    }
  },
  name: { 
    type: String, 
    default: '',
    maxlength: 100,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s]*$/.test(v);
      },
      message: 'Name can only contain letters and spaces'
    }
  },
  completedLessons: [{ 
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-z]+-\d+$/.test(v);
      },
      message: 'Invalid lesson ID format'
    }
  }],
  progress: {
    totalLessons: { type: Number, default: 0, min: 0, max: 100 },
    completedLessons: { type: Number, default: 0, min: 0, max: 100 },
    practiceScores: [{
      lessonId: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-z]+-\d+$/.test(v);
          }
        }
      },
      score: { type: Number, min: 0, max: 100 },
      completedAt: { type: Date, default: Date.now }
    }]
  },
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
}, { strict: true });

const User = mongoose.model('User', userSchema);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests' },
  standardHeaders: true
});
app.use(limiter);

// CSRF Protection
const generateCSRFToken = () => {
  return require('crypto').randomBytes(32).toString('hex');
};

app.get('/api/csrf-token', (req, res) => {
  const token = generateCSRFToken();
  res.json({ csrfToken: token });
});

const validateCSRF = (req, res, next) => {
  const token = req.headers['x-csrf-token'];
  if (!token) {
    return res.status(403).json({ error: 'CSRF token required' });
  }
  next();
};

// Enhanced Auth middleware
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, JWT_SECRET, {
      issuer: 'digital-education',
      audience: 'digital-education-users'
    }, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expired' });
        }
        if (err.name === 'JsonWebTokenError') {
          return res.status(403).json({ error: 'Invalid token' });
        }
        return res.status(403).json({ error: 'Token verification failed' });
      }
      
      // Validate token structure
      if (!decoded.mobile || !decoded.userId || decoded.type !== 'access') {
        return res.status(403).json({ error: 'Invalid token structure' });
      }
      
      req.user = decoded;
      next();
    });
  } catch (error) {
    log.error('Authentication error', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Login endpoint
app.post('/api/login', validateCSRF, async (req, res) => {
  try {
    const { mobile, name } = req.body;
    
    // Sanitize and validate mobile number
    const sanitizedMobile = mobile.replace(/\D/g, '');
    if (!sanitizedMobile || !/^[6-9]\d{9}$/.test(sanitizedMobile)) {
      return res.status(400).json({ error: 'Invalid mobile number format' });
    }
    
    // Sanitize name if provided
    const sanitizedName = name ? name.replace(/[^a-zA-Z\s]/g, '').trim().substring(0, 100) : '';
    
    let user = await User.findOne({ mobile: sanitizedMobile });
    
    // Sign Up - name provided, user shouldn't exist
    if (name) {
      if (user) {
        return res.status(400).json({ error: 'User already exists. Please sign in instead.' });
      }
      user = new User({ 
        mobile: sanitizedMobile,
        name: sanitizedName
      });
      await user.save();
    } 
    // Sign In - no name provided, user should exist
    else {
      if (!user) {
        return res.status(404).json({ error: 'User not found. Please sign up first.' });
      }
      user.lastLogin = new Date();
      await user.save();
    }

    const token = jwt.sign(
      { 
        mobile: user.mobile, 
        userId: user._id,
        iat: Math.floor(Date.now() / 1000),
        type: 'access'
      }, 
      JWT_SECRET, 
      { 
        expiresIn: '2h',
        issuer: 'digital-education',
        audience: 'digital-education-users'
      }
    );
    
    res.json({ 
      success: true,
      token,
      user: {
        id: user._id,
        mobile: user.mobile,
        name: user.name,
        progress: user.progress,
        completedLessons: user.completedLessons
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get user progress
app.get('/api/user/:mobile', authenticateToken, async (req, res) => {
  try {
    if (req.user.mobile !== req.params.mobile) {
      return res.status(403).json({ error: 'Access denied' });
    }
    // Sanitize and validate mobile parameter
    const mobileParam = req.params.mobile.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(mobileParam)) {
      return res.status(400).json({ error: 'Invalid mobile number format' });
    }
    
    const user = await User.findOne({ mobile: mobileParam });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Ensure progress counts are accurate
    user.progress.completedLessons = user.completedLessons.length;
    user.progress.totalLessons = 25;
    await user.save();
    
    res.json({ user });
  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Update user progress
app.post('/api/progress', authenticateToken, validateCSRF, async (req, res) => {
  try {
    const { mobile, lessonId, score } = req.body;
    
    if (req.user.mobile !== mobile) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Sanitize and validate lesson ID
    const sanitizedLessonId = lessonId.replace(/[^a-z0-9-]/g, '');
    if (!sanitizedLessonId || !/^[a-z]+-\d+$/.test(sanitizedLessonId)) {
      return res.status(400).json({ error: 'Invalid lesson ID format' });
    }
    
    // Sanitize and validate mobile in request body
    const sanitizedMobile = mobile.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(sanitizedMobile)) {
      return res.status(400).json({ error: 'Invalid mobile number format' });
    }
    
    // Validate score if provided
    if (score !== undefined && (typeof score !== 'number' || score < 0 || score > 100)) {
      return res.status(400).json({ error: 'Invalid score value' });
    }
    
    const user = await User.findOne({ mobile: sanitizedMobile });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add lesson to completed list if not already there
    if (!user.completedLessons.includes(sanitizedLessonId)) {
      user.completedLessons.push(sanitizedLessonId);
      user.progress.completedLessons = user.completedLessons.length;
    }

    // Update total lessons count
    user.progress.totalLessons = 25;

    // Add or update practice score
    if (score !== undefined) {
      const existingScoreIndex = user.progress.practiceScores.findIndex(s => s.lessonId === sanitizedLessonId);
      if (existingScoreIndex >= 0) {
        user.progress.practiceScores[existingScoreIndex].score = Math.max(
          user.progress.practiceScores[existingScoreIndex].score, 
          Math.min(100, Math.max(0, score))
        );
        user.progress.practiceScores[existingScoreIndex].completedAt = new Date();
      } else {
        user.progress.practiceScores.push({ 
          lessonId: sanitizedLessonId, 
          score: Math.min(100, Math.max(0, score)), 
          completedAt: new Date() 
        });
      }
    }

    await user.save();
    res.json({ message: 'Progress updated successfully', user });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Get all users (admin only)
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    // Admin check - only allow specific admin users
    const adminMobiles = process.env.ADMIN_MOBILES?.split(',') || [];
    if (!adminMobiles.includes(req.user.mobile)) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    const users = await User.find({}, { password: 0, __v: 0 }).limit(100);
    res.json({ users });
  } catch (error) {
    log.error('Users fetch error', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Analytics endpoint - require authentication
app.post('/api/analytics', authenticateToken, validateCSRF, (req, res) => {
  try {
    const { event, sessionId, timestamp, properties } = req.body;
    
    // Validate required fields
    if (!event || !sessionId || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Sanitize inputs
    const sanitizedEvent = String(event).substring(0, 100);
    const sanitizedSessionId = String(sessionId).substring(0, 50);
    const sanitizedTimestamp = Number(timestamp);
    
    if (!sanitizedEvent || !sanitizedSessionId || !sanitizedTimestamp) {
      return res.status(400).json({ error: 'Invalid input format' });
    }
    
    log.info('Analytics event', { 
      event: sanitizedEvent, 
      sessionId: sanitizedSessionId, 
      userId: req.user.userId,
      properties: properties ? Object.keys(properties).slice(0, 5) : [] 
    });
    res.json({ success: true });
  } catch (error) {
    log.error('Analytics error', error);
    res.status(500).json({ error: 'Failed to process analytics' });
  }
});

// Logs endpoint - require authentication
app.post('/api/logs', authenticateToken, validateCSRF, (req, res) => {
  try {
    const { level, message, timestamp, ...data } = req.body;
    
    // Validate and sanitize inputs
    const validLevels = ['info', 'warn', 'error'];
    const sanitizedLevel = validLevels.includes(level) ? level : 'info';
    const sanitizedMessage = String(message || '').substring(0, 500);
    
    if (!sanitizedMessage) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    log[sanitizedLevel](sanitizedMessage, {
      userId: req.user.userId,
      timestamp: timestamp || Date.now(),
      ip: req.ip
    });
    res.json({ success: true });
  } catch (error) {
    log.error('Logging error', error);
    res.status(500).json({ error: 'Failed to process log' });
  }
});

// Enhanced error handling
app.use((err, req, res, next) => {
  log.error('Unhandled error', { error: err.message, url: req.url });
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
});

app.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`);
  log.info(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});