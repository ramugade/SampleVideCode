const express = require('express');
const passport = require('passport');
const { body } = require('express-validator');
const router = express.Router();
const {
  register,
  login,
  getMe,
  logout,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Validation rules
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Local authentication routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/update-details', protect, updateDetails);
router.put('/update-password', protect, updatePassword);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.get('/verify-email/:token', verifyEmail);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.CLIENT_FAILURE_URL || '/login?error=auth_failed',
    session: false
  }),
  (req, res) => {
    // Generate JWT token
    const token = req.user.generateAuthToken();

    // Set cookie
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };

    res.cookie('token', token, cookieOptions);

    // Redirect to frontend with token
    const redirectUrl = `${process.env.CLIENT_SUCCESS_URL || '/dashboard'}?token=${token}`;
    res.redirect(redirectUrl);
  }
);

// Facebook OAuth routes
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email']
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: process.env.CLIENT_FAILURE_URL || '/login?error=auth_failed',
    session: false
  }),
  (req, res) => {
    const token = req.user.generateAuthToken();

    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };

    res.cookie('token', token, cookieOptions);

    const redirectUrl = `${process.env.CLIENT_SUCCESS_URL || '/dashboard'}?token=${token}`;
    res.redirect(redirectUrl);
  }
);

// Apple OAuth routes
router.post(
  '/apple',
  passport.authenticate('apple', {
    scope: ['email', 'name']
  })
);

router.post(
  '/apple/callback',
  passport.authenticate('apple', {
    failureRedirect: process.env.CLIENT_FAILURE_URL || '/login?error=auth_failed',
    session: false
  }),
  (req, res) => {
    const token = req.user.generateAuthToken();

    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };

    res.cookie('token', token, cookieOptions);

    const redirectUrl = `${process.env.CLIENT_SUCCESS_URL || '/dashboard'}?token=${token}`;
    res.redirect(redirectUrl);
  }
);

module.exports = router;
