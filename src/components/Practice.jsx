import React, { useState } from 'react';
import { getTranslation } from '../utils/translations';
import { ChevronRight, Clock, CheckCircle, Play, Lock, Star, Trophy } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const Practice = ({ currentLanguage }) => {
  const t = getTranslation(currentLanguage);
  const [selectedCategory, setSelectedCategory] = useState('computer');
  const { completedLessons } = useProgress();

  const categories = [
    { id: 'computer', name: 'Computer Basics', icon: '💻', color: 'blue' },
    { id: 'smartphone', name: 'Smartphone Skills', icon: '📱', color: 'green' },
    { id: 'internet', name: 'Internet & Safety', icon: '🌐', color: 'purple' },
    { id: 'apps', name: 'Essential Apps', icon: '📲', color: 'orange' },
    { id: 'appliances', name: 'Home Appliances', icon: '🏠', color: 'red' },
  ];

  const getQuizzes = (category) => {
    const quizTitles = {
      computer: ['Mouse and Keyboard Quiz', 'Files and Folders Quiz', 'MS Word Quiz', 'Internet Browsing Quiz', 'Email Quiz'],
      smartphone: ['Phone Settings Quiz', 'WhatsApp Quiz', 'Camera Quiz', 'Apps Quiz', 'Mobile Banking Quiz'],
      internet: ['Browser Quiz', 'Search Engines Quiz', 'Email Account Quiz', 'Online Safety Quiz', 'Government Services Quiz'],
      apps: ['Google Maps Quiz', 'YouTube Quiz', 'Shopping Apps Quiz', 'Payment Apps Quiz', 'Social Media Quiz'],
      appliances: ['Washing Machine Quiz', 'Microwave Quiz', 'AC Controls Quiz', 'Water Purifier Quiz', 'Smart TV Quiz']
    };

    return quizTitles[category]?.map((title, index) => {
      const lessonKey = `${category}-${index + 1}`;
      const isLessonCompleted = completedLessons.includes(lessonKey);
      
      return {
        id: index + 1,
        title,
        questions: 5,
        duration: '5 min',
        completed: false,
        locked: !isLessonCompleted,
        rating: 4.8 - (index * 0.1)
      };
    }) || [];
  };

  const selectedQuizzes = getQuizzes(selectedCategory);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const getQuizQuestions = (category, quizId) => {
    const allQuestions = {
      computer: {
        1: [ // Mouse and Keyboard Quiz
          { question: "What is the primary function of a computer mouse?", options: ["To type text", "To point and click", "To store data", "To connect to internet"], correct: 1 },
          { question: "Which mouse button is used most frequently?", options: ["Right button", "Left button", "Middle button", "Scroll wheel"], correct: 1 },
          { question: "What does double-clicking do?", options: ["Deletes files", "Opens files/programs", "Copies text", "Closes windows"], correct: 1 },
          { question: "Which keys are used for typing capital letters?", options: ["Ctrl key", "Alt key", "Shift key", "Space key"], correct: 2 },
          { question: "What is the space bar used for?", options: ["Deleting text", "Adding spaces", "Copying text", "Opening files"], correct: 1 }
        ],
        2: [ // Files and Folders Quiz
          { question: "What is a folder used for?", options: ["Playing music", "Organizing files", "Browsing internet", "Taking photos"], correct: 1 },
          { question: "How do you create a new folder?", options: ["Double-click desktop", "Right-click > New Folder", "Press Enter", "Open browser"], correct: 1 },
          { question: "What is the difference between a file and folder?", options: ["No difference", "Folder contains files", "File contains folders", "Both are same"], correct: 1 },
          { question: "How do you rename a file?", options: ["Double-click", "Right-click > Rename", "Press Delete", "Open with notepad"], correct: 1 },
          { question: "Where are deleted files stored?", options: ["Desktop", "Recycle Bin", "Documents", "Downloads"], correct: 1 }
        ],
        3: [ // MS Word Quiz
          { question: "What is MS Word used for?", options: ["Playing games", "Creating documents", "Browsing internet", "Editing photos"], correct: 1 },
          { question: "How do you make text bold in Word?", options: ["Ctrl + I", "Ctrl + U", "Ctrl + B", "Ctrl + S"], correct: 2 },
          { question: "What does Ctrl + S do in Word?", options: ["Opens file", "Saves document", "Prints document", "Closes Word"], correct: 1 },
          { question: "How do you change font size?", options: ["Type bigger", "Use font size dropdown", "Press Enter", "Use bold button"], correct: 1 },
          { question: "What is spell check used for?", options: ["Counting words", "Finding spelling errors", "Changing fonts", "Adding pictures"], correct: 1 }
        ],
        4: [ // Internet Browsing Quiz
          { question: "What is a web browser?", options: ["A game", "Software to access internet", "A folder", "An email app"], correct: 1 },
          { question: "Which is a popular web browser?", options: ["MS Word", "Google Chrome", "Calculator", "Paint"], correct: 1 },
          { question: "What does www stand for?", options: ["World Wide Web", "World Web Wide", "Web World Wide", "Wide World Web"], correct: 0 },
          { question: "How do you go to a website?", options: ["Type in address bar", "Click desktop", "Open Word", "Press Enter only"], correct: 0 },
          { question: "What is a homepage?", options: ["Last visited page", "First page of website", "Error page", "Download page"], correct: 1 }
        ],
        5: [ // Email Quiz
          { question: "What is email used for?", options: ["Playing music", "Sending messages", "Taking photos", "Making calls"], correct: 1 },
          { question: "What do you need to send an email?", options: ["Phone number", "Email address", "Home address", "Credit card"], correct: 1 },
          { question: "What is Gmail?", options: ["A game", "An email service", "A browser", "A folder"], correct: 1 },
          { question: "How do you reply to an email?", options: ["Delete it", "Click Reply button", "Forward it", "Print it"], correct: 1 },
          { question: "What is CC in email?", options: ["Copy Cat", "Carbon Copy", "Computer Code", "Call Center"], correct: 1 }
        ]
      },
      smartphone: {
        1: [ // Phone Settings Quiz
          { question: "Where do you find phone settings?", options: ["Camera app", "Settings app (gear icon)", "Phone app", "Gallery"], correct: 1 },
          { question: "How do you adjust screen brightness?", options: ["Settings > Display", "Camera app", "Phone app", "Gallery"], correct: 0 },
          { question: "How do you connect to Wi-Fi?", options: ["Settings > Wi-Fi", "Camera", "Phone", "Gallery"], correct: 0 },
          { question: "Where do you change ringtone?", options: ["Camera", "Settings > Sounds", "Gallery", "Phone only"], correct: 1 },
          { question: "How do you turn on airplane mode?", options: ["Settings or quick panel", "Camera app", "Gallery", "Phone app"], correct: 0 }
        ],
        2: [ // WhatsApp Quiz
          { question: "What is WhatsApp used for?", options: ["Taking photos", "Messaging and calls", "Playing games", "Setting alarms"], correct: 1 },
          { question: "How do you send a message on WhatsApp?", options: ["Type and press send", "Take a photo", "Make a call", "Open settings"], correct: 0 },
          { question: "How do you make a voice call on WhatsApp?", options: ["Type message", "Tap phone icon", "Take photo", "Open camera"], correct: 1 },
          { question: "How do you send a photo on WhatsApp?", options: ["Type only", "Tap camera/attachment icon", "Make call", "Open settings"], correct: 1 },
          { question: "What is WhatsApp status?", options: ["Phone number", "Share updates with contacts", "Phone settings", "Camera mode"], correct: 1 }
        ],
        3: [ // Camera Quiz
          { question: "How do you take a photo?", options: ["Open Settings", "Open Camera app and tap capture", "Open Gallery", "Open Phone"], correct: 1 },
          { question: "Where are photos stored after taking them?", options: ["Settings", "Gallery/Photos app", "Phone app", "Calculator"], correct: 1 },
          { question: "How do you switch between front and back camera?", options: ["Restart phone", "Tap camera switch icon", "Open settings", "Close app"], correct: 1 },
          { question: "How do you zoom in while taking photo?", options: ["Pinch screen", "Press volume", "Shake phone", "Open settings"], correct: 0 },
          { question: "What is flash used for?", options: ["Decoration", "Taking photos in low light", "Making calls", "Playing music"], correct: 1 }
        ],
        4: [ // Installing Apps Quiz
          { question: "Where do you download new apps?", options: ["Settings", "Play Store/App Store", "Gallery", "Camera"], correct: 1 },
          { question: "How do you install an app?", options: ["Take photo", "Tap Install button", "Make call", "Open settings"], correct: 1 },
          { question: "How do you uninstall an app?", options: ["Take photo", "Long press app > Uninstall", "Make call", "Open camera"], correct: 1 },
          { question: "What are app permissions?", options: ["App colors", "What app can access", "App size", "App price"], correct: 1 },
          { question: "How do you update apps?", options: ["Delete them", "Play Store > Updates", "Restart phone", "Take photo"], correct: 1 }
        ],
        5: [ // Mobile Banking Quiz
          { question: "What is mobile banking used for?", options: ["Taking photos", "Managing money and payments", "Playing games", "Making calls"], correct: 1 },
          { question: "What do you need for mobile banking?", options: ["Just phone", "Bank account and app", "Only camera", "Only gallery"], correct: 1 },
          { question: "How do you check account balance?", options: ["Take photo", "Open banking app", "Make call", "Open camera"], correct: 1 },
          { question: "What is UPI?", options: ["A game", "Unified Payment Interface", "A camera mode", "A phone setting"], correct: 1 },
          { question: "How do you transfer money?", options: ["Take photo", "Use banking/payment app", "Make call", "Open gallery"], correct: 1 }
        ]
      },
      internet: {
        1: [ // Browser Quiz
          { question: "What is a web browser used for?", options: ["Taking photos", "Accessing websites", "Making calls", "Playing music"], correct: 1 },
          { question: "How do you open a website?", options: ["Type URL in address bar", "Take photo", "Make call", "Open gallery"], correct: 0 },
          { question: "What is a URL?", options: ["A photo", "Website address", "Phone number", "App name"], correct: 1 },
          { question: "How do you bookmark a website?", options: ["Take screenshot", "Click bookmark/star icon", "Make call", "Close browser"], correct: 1 },
          { question: "What does refresh/reload do?", options: ["Closes browser", "Updates page content", "Takes photo", "Makes call"], correct: 1 }
        ],
        2: [ // Search Engines Quiz
          { question: "What is Google used for?", options: ["Sending emails only", "Searching information", "Taking photos", "Making calls"], correct: 1 },
          { question: "How do you search on Google?", options: ["Take photo", "Type keywords and press Enter", "Make call", "Open gallery"], correct: 1 },
          { question: "What are search results?", options: ["Photos", "List of relevant websites", "Phone numbers", "Games"], correct: 1 },
          { question: "How do you search for images?", options: ["Type only", "Click Images tab on Google", "Make call", "Open camera"], correct: 1 },
          { question: "What is voice search?", options: ["Typing", "Speaking your search", "Taking photo", "Making call"], correct: 1 }
        ],
        3: [ // Email Account Quiz
          { question: "How do you create an email account?", options: ["Go to Gmail/Yahoo and sign up", "Open camera", "Call someone", "Use calculator"], correct: 0 },
          { question: "What information is needed for email account?", options: ["Only phone", "Name, password, phone/recovery", "Only address", "Only age"], correct: 1 },
          { question: "What is a strong password?", options: ["123456", "Mix of letters, numbers, symbols", "Your name", "Your birthday"], correct: 1 },
          { question: "What is two-factor authentication?", options: ["One password", "Extra security with phone/SMS", "No password", "Only email"], correct: 1 },
          { question: "How do you recover forgotten password?", options: ["Give up", "Click 'Forgot Password' link", "Create new account", "Call police"], correct: 1 }
        ],
        4: [ // Online Safety Quiz
          { question: "What should you do with suspicious emails?", options: ["Open them", "Reply to them", "Delete them", "Forward them"], correct: 2 },
          { question: "What is phishing?", options: ["Catching fish", "Fraudulent emails/websites", "Online gaming", "Video streaming"], correct: 1 },
          { question: "Which websites are safer?", options: ["HTTP sites", "HTTPS sites (with lock icon)", "Any site", "Unknown sites"], correct: 1 },
          { question: "What should you never share online?", options: ["Your hobbies", "Passwords and personal info", "Favorite food", "Favorite color"], correct: 1 },
          { question: "What is antivirus software for?", options: ["Playing games", "Protecting from malware", "Taking photos", "Making calls"], correct: 1 }
        ],
        5: [ // Government Services Quiz
          { question: "What is Digital India?", options: ["A game", "Government's digital initiative", "A movie", "A phone"], correct: 1 },
          { question: "What can you do on government websites?", options: ["Only play games", "Apply for services, pay bills", "Only chat", "Only watch videos"], correct: 1 },
          { question: "What is Aadhaar used for?", options: ["Playing games", "Identity verification", "Taking photos", "Making calls"], correct: 1 },
          { question: "How do you pay government bills online?", options: ["Only cash", "Government portals/apps", "Only phone", "Only in person"], correct: 1 },
          { question: "What is e-governance?", options: ["Electronic games", "Digital government services", "Email only", "Phone calls only"], correct: 1 }
        ]
      },
      apps: {
        1: [ // Google Maps Quiz
          { question: "What is Google Maps used for?", options: ["Playing games", "Finding directions and locations", "Shopping", "Chatting"], correct: 1 },
          { question: "How do you search for a location?", options: ["Take photo", "Type place name in search", "Make call", "Open camera"], correct: 1 },
          { question: "What does the blue dot represent?", options: ["Destination", "Your current location", "A shop", "A restaurant"], correct: 1 },
          { question: "How do you get directions?", options: ["Just look", "Tap Directions button", "Take photo", "Make call"], correct: 1 },
          { question: "What is GPS?", options: ["A game", "Global Positioning System", "A phone brand", "A camera mode"], correct: 1 }
        ],
        2: [ // YouTube Quiz
          { question: "What is YouTube used for?", options: ["Banking only", "Watching and sharing videos", "Navigation only", "Shopping only"], correct: 1 },
          { question: "How do you search for videos?", options: ["Take photo", "Type in search bar", "Make call", "Open camera"], correct: 1 },
          { question: "How do you subscribe to a channel?", options: ["Take photo", "Click Subscribe button", "Make call", "Close app"], correct: 1 },
          { question: "What does the like button do?", options: ["Deletes video", "Shows you enjoyed the video", "Makes call", "Takes photo"], correct: 1 },
          { question: "How do you share a video?", options: ["Delete it", "Click Share button", "Take photo", "Make call"], correct: 1 }
        ],
        3: [ // Shopping Apps Quiz
          { question: "Which apps are used for online shopping?", options: ["WhatsApp only", "Amazon, Flipkart, etc.", "Calculator only", "Camera only"], correct: 1 },
          { question: "How do you buy something online?", options: ["Just look", "Add to cart and checkout", "Take photo", "Make call"], correct: 1 },
          { question: "What is needed for online payment?", options: ["Nothing", "Card/UPI/wallet details", "Only phone", "Only camera"], correct: 1 },
          { question: "How do you track your order?", options: ["Guess", "Check order status in app", "Take photo", "Make call"], correct: 1 },
          { question: "What should you check before buying?", options: ["Nothing", "Reviews, ratings, return policy", "Only price", "Only photos"], correct: 1 }
        ],
        4: [ // Payment Apps Quiz
          { question: "What are PayTM, PhonePe, GPay used for?", options: ["Taking photos", "Digital payments", "Navigation", "Gaming only"], correct: 1 },
          { question: "How do you send money using UPI?", options: ["Take photo", "Enter UPI ID or scan QR", "Make call", "Open camera"], correct: 1 },
          { question: "What is a QR code?", options: ["A photo", "Square barcode for payments", "A game", "A phone number"], correct: 1 },
          { question: "How do you recharge your phone?", options: ["Only go to shop", "Use payment apps", "Take photo", "Make call"], correct: 1 },
          { question: "What is wallet balance?", options: ["Phone battery", "Money stored in app", "Photo storage", "Call duration"], correct: 1 }
        ],
        5: [ // Social Media Quiz
          { question: "What are Facebook, Instagram used for?", options: ["Banking only", "Social networking and sharing", "Navigation only", "Shopping only"], correct: 1 },
          { question: "How do you add friends on Facebook?", options: ["Take photo", "Send friend request", "Make call", "Open camera"], correct: 1 },
          { question: "What is a post on social media?", options: ["Mail delivery", "Content you share", "Phone call", "Photo storage"], correct: 1 },
          { question: "How do you like someone's post?", options: ["Take photo", "Tap like/heart button", "Make call", "Delete app"], correct: 1 },
          { question: "What should you be careful about on social media?", options: ["Nothing", "Privacy settings and what you share", "Only photos", "Only friends"], correct: 1 }
        ]
      },
      appliances: {
        1: [ // Washing Machine Quiz
          { question: "What should you check before starting washing machine?", options: ["Water level and detergent", "Only power button", "Just clothes", "Nothing"], correct: 0 },
          { question: "How do you sort clothes before washing?", options: ["Don't sort", "By color and fabric type", "By size only", "By brand only"], correct: 1 },
          { question: "Where do you put detergent?", options: ["With clothes", "In detergent dispenser", "On top of machine", "Outside machine"], correct: 1 },
          { question: "What does the spin cycle do?", options: ["Adds water", "Removes excess water", "Adds detergent", "Heats water"], correct: 1 },
          { question: "How often should you clean the washing machine?", options: ["Never", "Monthly with cleaning cycle", "Every 5 years", "Only when broken"], correct: 1 }
        ],
        2: [ // Microwave Quiz
          { question: "What should NOT go in microwave?", options: ["Glass bowl", "Metal utensils", "Microwave-safe plastic", "Ceramic plate"], correct: 1 },
          { question: "How do you set cooking time?", options: ["Guess", "Use timer buttons/dial", "Just press start", "Leave it running"], correct: 1 },
          { question: "What power level is good for reheating?", options: ["100% always", "50-70% for most foods", "10% only", "Maximum always"], correct: 1 },
          { question: "Why should you cover food in microwave?", options: ["Looks better", "Prevents splattering", "Makes it cook slower", "No reason"], correct: 1 },
          { question: "How do you clean microwave?", options: ["Never clean", "Wipe with damp cloth", "Use metal scrubber", "Put in dishwasher"], correct: 1 }
        ],
        3: [ // AC Controls Quiz
          { question: "How do you turn on air conditioner?", options: ["Just plug in", "Use remote control", "Clap hands", "Wave at it"], correct: 1 },
          { question: "What temperature is comfortable for most people?", options: ["16°C", "24-26°C", "30°C", "35°C"], correct: 1 },
          { question: "What does the fan speed control?", options: ["Temperature", "Air circulation speed", "Power consumption", "Nothing"], correct: 1 },
          { question: "How often should you clean AC filter?", options: ["Never", "Every 2-3 months", "Every 5 years", "Daily"], correct: 1 },
          { question: "What is the timer function for?", options: ["Decoration", "Auto on/off at set times", "Changing channels", "Playing music"], correct: 1 }
        ],
        4: [ // Water Purifier Quiz
          { question: "When should you replace water purifier filter?", options: ["Never", "When indicator light shows", "Every day", "When water is cold"], correct: 1 },
          { question: "What does a water purifier do?", options: ["Heats water", "Removes impurities from water", "Adds flavor", "Changes color"], correct: 1 },
          { question: "How do you know filter needs replacement?", options: ["Guess", "Indicator light or reduced flow", "Water tastes same", "Machine is quiet"], correct: 1 },
          { question: "What maintenance does purifier need?", options: ["Nothing", "Regular filter change and cleaning", "Only when broken", "Paint it"], correct: 1 },
          { question: "Why is purified water important?", options: ["Tastes different", "Removes harmful bacteria/chemicals", "Looks different", "More expensive"], correct: 1 }
        ],
        5: [ // Smart TV Quiz
          { question: "How do you turn on Smart TV?", options: ["Clap hands", "Press power on remote", "Wave at it", "Shout at it"], correct: 1 },
          { question: "How do you change channels?", options: ["Touch screen", "Use remote channel buttons", "Shake remote", "Whistle"], correct: 1 },
          { question: "How do you connect TV to internet?", options: ["It's automatic", "Settings > Network/WiFi", "Call technician", "Buy new TV"], correct: 1 },
          { question: "What are streaming apps?", options: ["TV channels", "Netflix, YouTube, etc.", "Remote controls", "TV stands"], correct: 1 },
          { question: "How do you adjust volume?", options: ["Touch TV", "Volume buttons on remote", "Clap louder", "Move closer to TV"], correct: 1 }
        ]
      }
    };
    
    return allQuestions[category]?.[quizId] || [];
  };
  
  const currentQuizQuestions = selectedQuiz ? getQuizQuestions(selectedCategory, selectedQuiz.id) : [];

  const handleQuizClick = (quiz) => {
    if (!quiz.locked) {
      setSelectedQuiz(quiz);
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setSelectedAnswer(null);
    }
  };

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const currentQuestions = quizQuestions[selectedCategory];
    if (currentQuizQuestions && answerIndex === currentQuizQuestions[currentQuestion]?.correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < 5) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const closeQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t.practice || 'Practice Quizzes'}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Test your knowledge with interactive quizzes. 5 questions for each topic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">{t.learningCategories || 'Quiz Categories'}</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/25 scale-105'
                        : 'text-white hover:bg-white/10 hover:scale-102'
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-semibold">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className={`group bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 ${
                    quiz.locked ? 'opacity-60' : 'hover:-translate-y-2'
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${
                        quiz.completed ? 'bg-green-500' : quiz.locked ? 'bg-gray-400' : 'bg-purple-500'
                      }`}>
                        {quiz.completed ? (
                          <CheckCircle className="h-8 w-8 text-white" />
                        ) : quiz.locked ? (
                          <Lock className="h-8 w-8 text-white" />
                        ) : (
                          <Trophy className="h-8 w-8 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{quiz.title}</h3>
                        <div className="flex items-center space-x-4 text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">{quiz.duration}</span>
                          </div>
                          <span className="text-sm">{quiz.questions} questions</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${
                            i < Math.floor(quiz.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`} />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600">{quiz.rating}</span>
                    </div>
                    <button
                      disabled={quiz.locked}
                      onClick={() => handleQuizClick(quiz)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        quiz.locked
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : quiz.completed
                          ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/25'
                          : 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg shadow-purple-500/25 hover:scale-105'
                      }`}
                    >
                      {quiz.locked ? (t.completeLessonFirst || 'Complete Lesson First') : quiz.completed ? (t.retake || 'Retake') : (t.startQuiz || 'Start Quiz')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {selectedQuiz && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedQuiz.title}</h2>
                <p className="text-gray-600 mt-1">{selectedQuiz.questions} questions</p>
              </div>
              <button onClick={closeQuiz} className="p-2 hover:bg-gray-100 rounded-lg">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            
            <div className="p-6">
              {!showResult ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      Question {currentQuestion + 1} of 5
                    </h3>
                    <div className="text-sm text-gray-600">Score: {score}/{currentQuestion}</div>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-900 mb-8">
                    {currentQuizQuestions[currentQuestion]?.question || 'Loading question...'}
                  </h4>
                  
                  <div className="space-y-4">
                    {(currentQuizQuestions[currentQuestion]?.options || []).map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          selectedAnswer === null
                            ? 'border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                            : selectedAnswer === index
                            ? index === currentQuizQuestions[currentQuestion]?.correct
                              ? 'border-green-500 bg-green-100 text-green-800'
                              : 'border-red-500 bg-red-100 text-red-800'
                            : index === currentQuizQuestions[currentQuestion]?.correct
                            ? 'border-green-500 bg-green-100 text-green-800'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h3>
                  <p className="text-xl text-gray-700 mb-6">
                    You scored {score} out of 5
                  </p>
                  <button
                    onClick={closeQuiz}
                    className="bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors font-semibold"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Practice;