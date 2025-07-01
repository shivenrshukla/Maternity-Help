const User = require('../models/Users');
const JWTUtils = require('../utils/jwt');

// Middleware to authenticate JWT token
const authenticateToken = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers['authorization'];
        const token = JWTUtils.extractTokenFromHeader(authHeader);

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Access token required'
            });
        }

        // Verify token
        const decoded = JWTUtils.verifyToken(token);

        // Check if user still exists
        const user = await User.findById(decoded.userId).select('+passwordChangedAt');
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'User no longher exists'
            });
        }

        // Check if the user is still active
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                error: 'User account is deactivated'
            });
        }

        // Check if the user has changed password after the token  was issued
        if (user.changedPasswordAfter(decoded.iat)) {
            return res.status(401).json({
                success: false,
                error: 'Password was changed recently. Please log in again.'
            });
        }

        req.user = user;
        req.userId = user._id;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);

        let errorMessage = 'Invalid or expired token';
        if (error.name === 'TokenExpiredError') {
            errorMessage = 'Token has expired';
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage = 'Invalid token format';
        }

        return res.status(403).json({
            success: false,
            error: errorMessage
        });
    }
};

/**
 * Middleware to authorize user roles
 * @param {...string} roles - Allowed roles
 */
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Insufficient permissions'
            });
        }

        next();
    };
};

// Optinal Authentication - Don't fail if no token provided

const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = JWTUtils.extractTokenFromHeader(authHeader);

        if (token) {
            const decoded = JWTUtils.verifyToken(token);
            const user = await User.findById(decoded.userId);

            if (user && user.isActive && !user.changedPasswordAfter(decoded.iat)) {
                req.user = user;
                req.userId = user._id;
            }
        }

        next();
    } catch (error) {
        next();
    }
};

/**
 * Middleware to check if user owns the resource
 * Expects resource ID in req.params.id or req.params.userId
 */
const checkResourceOwnership = (resourceParam = 'id') => {
    return (req, res, next) => {
        const resourceId = req.params[resourceParam] || req.params.userId;
        const userId = req.userId.toString();

        if (rsourceId !== userId) {
            return res.status(403).json({
                success: false,
                error: 'Access denied. You can only access your own resources.'
            });
        }

        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRoles,
    optionalAuth,
    checkResourceOwnership
};