const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("user");

// let vat = localStorage.setItem('emri', JSON.stringify(User));
// let vat2 = localStorage.getItem('emri');
// JSON.parse(vat2);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
