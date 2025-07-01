// routes/authRoutes.js
const express = require('express');
const AuthController = require('../controllers/authController');
const { authenticateToken, authorizeRole, authorizeRoles } = require('../middleware/auth');
const {
    validateRegistration,
    validateLogin,
    validatePasswordChange,
    validateProfileUpdate,
    sanitizeInput
} = require('../middleware/validation');
const router = express.Router();

// Public routes
router.post('/register', sanitizeInput, validateRegistration, AuthController.register);
router.post('/login', sanitizeInput, validateLogin, AuthController.login);
router.post('/refresh', AuthController.refreshToken);

// Protected routes (require authentication)
router.use(authenticateToken);

// All routes below require authentication
router.get('/profile', AuthController.getProfile);
router.put('/profile', sanitizeInput, validateProfileUpdate, AuthController.updateProfile);
router.put('/password', sanitizeInput, validatePasswordChange, AuthController.changePassword);
router.post('/logout', AuthController.logout);
router.delete('/deactivate', AuthController.deactivateAccount);

// Admin-only routes
router.get('/users', authorizeRoles('admin'), AuthController.getAllUsers);
router.get('/users/:userId', authorizeRoles('admin'), AuthController.getUserById);
router.put('/users/:userId/role', authorizeRoles('admin'), AuthController.updateUserRole);
router.delete('/users/:userId', authorizeRoles('admin'), AuthController.deleteUser);

module.exports = router;