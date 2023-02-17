const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const { studentModel } = require('../model/student/studentModel');
require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://student-portal-gecg.herokuapp.com/api/auth/google/callback",
    // callbackURL: "http://localhost:4000/api/auth/google/callback",
    // callbackURL: "http://localhost:3000/personal",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {

    studentModel.findOne({ googleId: profile.id })
    .then(student => {

      if (student) {

        console.log("student already exist");
        done(null, student);
        
      } else {
        console.log(profile);
        let enrollmentNumber = profile.emails[0].value.split("@")[0];

        new studentModel({
          googleId: profile.id,
          instituteEmail: profile.emails[0].value,
          enrollmentNumber
        }).save()
        .then(student => {
          console.log(student);
          done(null, student)
        })
        .catch(err => done(err, false));

      }

    })
    .catch(err => done(err, false));
  }

      // function(err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (user) {
      //     return done(null, user);
      //   } else {
      //     const newUser = new studentModel();
      //     newUser.email = profile.emails[0].value;
      //     newUser.name = profile.displayName;
      //     newUser.save(function(err) {
      //       if (err) {
      //         throw err;
      //       }
      //       return done(null, newUser);
      //     });
      //   }
      // }
      
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
}); 

passport.deserializeUser(function(id, done) {
  studentModel.findById(id).then(user => {
    done(null, user);
  });
});