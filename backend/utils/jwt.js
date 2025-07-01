const jwt = require('jsonwebtoken');

class JWTUtils {

    /**
     * Generate JWT token
     * @param {string} userId - User ID to encode in token
     * @param {string} role - User role (optional)
     * @returns {string} JWT token
     */
    static generateToken(userId, role = 'user') {
        const payload = {
            userId,
            role,
            iat: Math.floor(Date.now()/ 1000)
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
            issuer: 'jwt-auth-backend',
            audience: 'jwt-auth-client'
        });
    }

    /**
     * Verify JWT token
     * @param {string} token - JWT token to verify
     * @returns {Object} Decoded token payload
     */
    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET, {
                issuer: 'jwt-auth-backend',
                audience: 'jwt-auth-client'
            });
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    /**
     * Decode JWT token without verification (for debugging)
     * @param {string} token - JWT token to decode
     * @returns {Object} Decoded token payload
     */
    static decodeToken(token) {
        return jwt.decode(token);
    }

    /**
     * Get token expiration time
     * @param {string} token - JWT token
     * @returns {Date} Expiration date
     */
    static gettokenExpiration(token) {
        const decoded = this.decodeToken(token);
        return new Date(decoded.exp * 1000);
    }

    /**
     * Check if token is expired
     * @param {string} token - JWT token
     * @returns {boolean} True if expired
     */
    static isTokenExpired(token) {
        try {
            const decoded = this.decodeToken(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < currentTime;
        } catch (error) {
            return true;
        }
    }

    /**
    * Extract token from Authorization header
    * @param {string} authHeader - Authorization header value
    * @returns {string|null} Extracted token or null
    */
    static extractTokenFromHeader(authHeader) {
        if (!authHeader) return null;

        const parts = authHeader.split(' ');
        if (parts.length != 2 || parts[0] != 'Bearer') return null;

        return parts[1];
    }

    /**
     * Generate refresh token (longer expiry)
     * @param {string} userId - User ID
     * @returns {string} Refresh token
     */
    static generateRefreshToken(userId) {
        const payload = {
            userId,
            type: 'refresh',
            iat: Math.floor(Date.now() / 1000)
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '30d',
            issuer: 'jwt-auth-backend',
            audience: 'jwt-auth-client'
        });
    }
}

module.exports = JWTUtils;