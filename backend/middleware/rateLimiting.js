const rateLimit = require('express-rate-limit');

// General rate limiting
const generalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,  // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: {
        success: false,
        error: 'Too many requests from this IP, please try again later.',
        retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15*60*1000) / 1000 / 60)  // in minutes
    },
    standardHeaders: true,      // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,       // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: 'Too many requests from this IP, please try again later.',
            retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000 / 60)
        });
    }
});

// Strict rate limiting for authentication endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,   // 15 minutes
    max: 5,   // Limit each IP to 5 requests per windowMs for auth endpoints
    message: {
        success: false,
        error: 'Too many authentication attempts, please try again in 15 minutes.',
        retryAfter: 15
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulrequests: false,  // Count successful requests
    skipFailedRequests: false,   // Count failed requests
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: 'Too many authentication attempts, please try again in 15 minutes.',
            retryAfter: 15
        });
    }
});

// More lenient rate limiting for general API endpoints
const apiLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS,
    max: 200,
    message: {
        success: false,
        error: 'Too many API requests, please try again later.',
        retryAfter: 15
    },
    standardHeaders: true,
    legacyHeaders: true,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: 'Too many API requests, please try again later.',
            retryAfter: 15
        });
    }
});

// Very strict rate limiting for password reset endpoints
const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,   // 1 hour
    max: 3,  // Limit each IP to 3 password rest requests per hour
    message: {
        success: false,
        error: 'Too many password rest attempts, please try again in 1 hour.',
        retryAfter: 60
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: 'Too many password reset attempts, please try again in 1 hour.',
            retryAfter: 60
        });
    }
});

// Admin endpoints rate limiting
const adminLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS,
    max: 50,   // Limit admin operations
    message: {
        success: false,
        error: 'Too many admin requests, please try again later.',
        retryAfter: 15
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: 'Too many admin requests, please try again later.',
            retryAfter: 15
        });
    }
});

// Create a custom rate limiter
const createRateLimiter = (windowMs, max, message) => {
    return rateLimit({
        windowMs,
        max,
        message: {
            success: false,
            error: message,
            retryAfter: Math.ceil(windowMs / 1000 / 60)
        },
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            res.status(429).json({
                success: false,
                error: message,
                retryAfter: Math.ceil(windowMs / 1000 / 60)
            });
        }
    });
};

module.exports = {
    generalLimiter,
    authLimiter,
    apiLimiter,
    passwordResetLimiter,
    adminLimiter,
    createRateLimiter
};