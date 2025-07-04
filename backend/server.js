require('dotenv').config();
const express = require("express");
const cors = require('cors');
const connectDB = require('./config/database');
const { errorHandler, notFound } = require('./middleware/error');
const { generalLimiter, authLimiter, apiLimiter } = require('./middleware/rateLimiting');

// Import Routes
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require('./routes/protected');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Allow Next.js dev server
    credentials: true, // ✅ Needed if using cookies (optional)
  })
)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/auth/auth', authLimiter);    // Strict rate limiting for auth endpoints
app.use('/api', apiLimiter);      // General API rate limiting
app.use(generalLimiter);     // General rate limiting for all other endpoints


// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Request logging middleware (development only)
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}}`);
        next();
    });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        data: {
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: process.env.npm_package_version || '1.0.0',
            environment: process.env.NODE_ENV || 'development',
            node: process.version,
            memory: process.memoryUsage(),
            cpu: process.cpuUsage()
        }
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Welcome route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to JWT Authentication API',
        data: {
            version: '1.0.0',
            endpoints: {
                auth: '/api/auth',
                protected: '/api/protected',
                health: '/api/health'
            },
            documentation: {
                auth: {
                    register: 'POST /api/auth/register',
                    login: 'POST /api/auth/login',
                    profile: 'GET /api/auth/profile',
                    updateProfile: 'PUT /api/auth/profile',
                    changePassword: 'PUT /api/auth/password',
                    refreshToken: 'POST /api/auth/refresh',
                    logout: 'POST /api/auth/logout'
                },
                admin: {
                    getAllUsers: 'GET /api/auth/users',
                    getUserById: 'GET /api/auth/users/:userId',
                    updateUserRole: 'PUT /api/auth/users/:userId/role',
                    deleteUser: 'DELETE /api/auth/users/:userId'
                },
                protected: {
                    general: 'GET /api/protected',
                    userData: 'GET /api/protected/user/:userId/data',
                    adminDashboard: 'GET /api/protected/admin/dashboard'
                }
            }
        }
    });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8001;
const server = app.listen(PORT, () => {
    console.log(`
🚀 JWT Authentication Server is running!
📡 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📚 API Base URL: http://localhost:${PORT}/api
🏥 Health Check: http://localhost:${PORT}/api/health

📋 Available Endpoints:
   Authentication:
   ├── POST   /api/auth/register     - Register new user
   ├── POST   /api/auth/login        - Login user  
   ├── POST   /api/auth/refresh      - Refresh token
   ├── GET    /api/auth/profile      - Get user profile
   ├── PUT    /api/auth/profile      - Update profile
   ├── PUT    /api/auth/password     - Change password
   └── POST   /api/auth/logout       - Logout user
   
   Admin Only:
   ├── GET    /api/auth/users        - Get all users
   ├── GET    /api/auth/users/:id    - Get user by ID
   ├── PUT    /api/auth/users/:id/role - Update user role
   └── DELETE /api/auth/users/:id    - Delete user
   
   Protected Routes:
   ├── GET    /api/protected         - General protected
   ├── GET    /api/protected/user/:userId/data - User data
   └── GET    /api/protected/admin/dashboard   - Admin dashboard

💡 Don't forget to set up your environment variables!
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🔄 SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🔄 SIGINT received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

module.exports = app;