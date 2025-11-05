const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const AppleStrategy = require('passport-apple').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // User exists, return user
            return done(null, user);
          }

          // Check if email is already registered
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
            user.avatar = profile.photos[0]?.value;
            await user.save();
            return done(null, user);
          }

          // Create new user
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar: profile.photos[0]?.value,
            provider: 'google',
            isEmailVerified: true // Google emails are verified
          });

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

// Facebook OAuth Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'emails', 'name', 'picture.type(large)']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await User.findOne({ facebookId: profile.id });

          if (user) {
            return done(null, user);
          }

          // Check if email is already registered
          const email = profile.emails?.[0]?.value;
          if (email) {
            user = await User.findOne({ email });

            if (user) {
              // Link Facebook account to existing user
              user.facebookId = profile.id;
              user.avatar = profile.photos?.[0]?.value;
              await user.save();
              return done(null, user);
            }
          }

          // Create new user
          user = await User.create({
            facebookId: profile.id,
            email: email,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            avatar: profile.photos?.[0]?.value,
            provider: 'facebook',
            isEmailVerified: !!email
          });

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

// Apple OAuth Strategy
if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID) {
  passport.use(
    new AppleStrategy(
      {
        clientID: process.env.APPLE_CLIENT_ID,
        teamID: process.env.APPLE_TEAM_ID,
        keyID: process.env.APPLE_KEY_ID,
        privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
        callbackURL: process.env.APPLE_CALLBACK_URL,
        passReqToCallback: true
      },
      async (req, accessToken, refreshToken, idToken, profile, done) => {
        try {
          // Apple provides minimal profile information
          const appleId = profile.id;
          const email = profile.email;

          // Check if user already exists
          let user = await User.findOne({ appleId });

          if (user) {
            return done(null, user);
          }

          // Check if email is already registered
          if (email) {
            user = await User.findOne({ email });

            if (user) {
              // Link Apple account to existing user
              user.appleId = appleId;
              await user.save();
              return done(null, user);
            }
          }

          // Create new user
          // Note: Apple may not provide name on subsequent logins
          const name = req.body?.user?.name
            ? `${req.body.user.name.firstName} ${req.body.user.name.lastName}`
            : email?.split('@')[0] || 'User';

          user = await User.create({
            appleId,
            email,
            name,
            provider: 'apple',
            isEmailVerified: true // Apple emails are verified
          });

          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

module.exports = passport;
