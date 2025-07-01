const express = require('express');
const { authenticateToken, authorizeRoles, checkResourceOwnership } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Example protected route = accessible to all authenticated users
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the protected area!',
        data: {
            user: {
                id: req.userId,
                role: req.user.role,
                name: req.user.name
            },
            timestamp: new Date().toISOString(),
            serverTime: Date.now()
        }
    });
});

// User-specific protected route
// Users' own data
router.get('/user/:userId/data', checkResourceOwnership('userId'), (req, res) => {
    res.json({
        success: true,
        message: 'User-specific data retrieved successfully',
        data: {
            userId: req.params.userId,
            userData: {
                // From the database
                preferences: { theme: 'dark', language: 'en' },
                statistics: { loginCount: 42, lastActive: new Date() },
                settings: { notifications: true, privacy: 'private' }
            }
        }
    });
});

// Admin-only protected route
router.get('/admin/dashboard', authorizeRoles('admin'), (req, res) => {
    res.json({
        success: true,
        message: 'Admin dashboard data',
        data: {
            adminData: {
                totalUsers: 150,
                activeUsers: 120,
                systemHealth: 'good',
                serverUptime: process.uptime(),
                memoryUsage: process.memoryUsage()
            }
        }
    });
});

// Admin-only system stats
router.get('/admin/stats', authorizeRoles('admin'), (req, res) => {
    res.json({
        success: true,
        data: {
            system: {
                nodeVersion: process.version(),
                platform: process.platform,
                uptime: process.uptime(),
                memoryUsage: process.memoryUsage(),
                cpuUsage: process.cpuUsage()
            },
            database: {
                status: 'connected',
                // actual DB stats
            },
            api: {
                version: '1.0.0',
            }
        }
    });
});

// Multi-role protected route (admin or specific user)
router.get('/user/:userId/profile', (req, res, next) => {
    // Allow if admin or if user is accessing their own profile
    if (req.user.role === 'admin' || req.params.userId == req.userId.toString()) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            error: 'Access denied. Insufficient permissions.'
        });
    }
}, (req, res) => {
    res.json({
        success: true,
        message: 'Profile data retrieved',
        data: {
            profile: {
                userId: req.params.userId,
                accessedBy: req.userId.toString(),
                isAdmin: req.user.role === 'admin'
            }
        }
    });
});

// Riute with optional file upload (example)
router.post('/upload', (req, res) => {
    // Typically handle file uploads
    res.json({
        success: true,
        message: 'File upload endpoint (implement with muter for actual file handling',
        data: {
            userId: req.userId,
            timestamp: new Date().toISOString()
        }
    });
});

// Bulk operations route (admin only)
router.post('/admin/bulk-action', authorizeRoles('admin'), (req, res) => {
    const { action, userIds } = req.body;

    if (!action || !userIds || !Array.isArray(userIds)) {
        return res.status(400).json({
            success: false,
            error: 'Action and userIds array are required'
        });
    }

    // This would perform bulk operations on users
    res.json({
        success: true,
        message: `Bulk ${action} operation initiated`,
        data: {
            action,
            userCount: userIds.length,
            initiatedBy: req.userId
        }
    });
});

module.exports = router;