class Cache {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.ttl = 5 * 60 * 1000; // 5 minutes
    this.maxSize = maxSize;
  }

  set(key, value, customTtl = null) {
    try {
      const sanitizedKey = this.sanitizeKey(key);
      if (!sanitizedKey) return false;
      
      // Clean expired entries before adding new ones
      this.cleanup();
      
      // If at max size, remove oldest entry
      if (this.cache.size >= this.maxSize) {
        const firstKey = this.cache.keys().next().value;
        if (firstKey) this.cache.delete(firstKey);
      }
      
      const expiry = Date.now() + Math.min(customTtl || this.ttl, 86400000); // Max 24 hours
      this.cache.set(sanitizedKey, { value, expiry, accessed: Date.now() });
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  get(key) {
    try {
      const sanitizedKey = this.sanitizeKey(key);
      if (!sanitizedKey) return null;
      
      const item = this.cache.get(sanitizedKey);
      if (!item) return null;
      
      if (Date.now() > item.expiry) {
        this.cache.delete(sanitizedKey);
        return null;
      }
      
      // Update access time for LRU
      item.accessed = Date.now();
      return item.value;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  cleanup() {
    try {
      const now = Date.now();
      const keysToDelete = [];
      
      for (const [key, item] of this.cache.entries()) {
        if (!item || now > item.expiry) {
          keysToDelete.push(key);
        }
      }
      
      keysToDelete.forEach(key => this.cache.delete(key));
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
  
  sanitizeKey(key) {
    if (typeof key !== 'string' || key.length === 0) return null;
    // Remove path traversal attempts and limit length
    const sanitized = key.replace(/[.\/\\]/g, '').substring(0, 100);
    // Only allow alphanumeric, hyphens, underscores
    return /^[a-zA-Z0-9_-]+$/.test(sanitized) ? sanitized : null;
  }
}

const globalCache = new Cache(50); // Smaller cache size for better performance

// Cleanup expired entries every 10 minutes
setInterval(() => {
  globalCache.cleanup();
}, 10 * 60 * 1000);

export const setCache = (key, value, ttl) => globalCache.set(key, value, ttl);
export const getCache = (key) => globalCache.get(key);
export const clearCache = () => globalCache.clear();
export const getCacheSize = () => globalCache.size();
export default globalCache;