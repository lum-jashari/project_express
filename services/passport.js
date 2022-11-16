const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const moongose = require("mongoose");
const User = moongose.model("user");
const passport = require("passport");

passport.serializeUser((user, done) => {
    done(null.user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findone({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            } else {
                const user = await new User({ googleId: profile.id }).save();
                done(null, existingUser);
            }
        }
    )
);

// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");
// const mongoose = require("mongoose");
// const User = mongoose.model("user");
// const keys = require("../config/keys");

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id).then((user) => {
//         done(null, user);
//     });
// });

// passport.use(
//     new GoogleStrategy({
//         clientID: keys.googleClientId,
//         clientSecret: keys.googleClientSecret,
//         callbackURL: '/auth/google/callback',
//         proxy: true,
//     }),
//     async (accessToken, refreshToken, profile, done) => {
//         const existingUser = await User.findOne({ googleId: profile.id });
//         if (existingUser) {
//             return done(null, existingUser);
//         }
//         const user = await new User({ googleid: profile.id }).save();
//         done(null, user);
//     }
// );
