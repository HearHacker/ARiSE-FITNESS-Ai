import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import env from './env.js';
import User from '../models/User.js';

export const configurePassport = () => {
  if (!env.googleClientId || !env.googleClientSecret) {
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.googleClientId,
        clientSecret: env.googleClientSecret,
        callbackURL: env.googleCallbackUrl
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              email,
              name: profile.displayName,
              googleId: profile.id,
              fitnessGoal: 'endurance',
              fitnessLevel: 'beginner'
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};
