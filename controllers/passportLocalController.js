const passport = require("passport");      //// step [3] in setting the passport 
const passportLocal = require("passport-local");
const loginService = require("../services/loginService");


let localStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    // setting passport strategy
    passport.use(new localStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
        // fetching the passport data (username , email)
        async (req, email, password, done) => {
            try {
                // checking if the user exist in the database
                let user = await loginService.findUserByEmail(email);
                if (!user) { // case user doesn't exist
                    return done(null, false, req.flash("errors", `This user email "${email}" doesn't exist`));
                }
                else { // case user exist → compare entered password with the stored password in the database
                    let match = await loginService.compairPassword(user, password);
                    if (match === true) {
                        return done(null, user, null);// case password matchs return (no errors, user, no options)
                    } else {
                        return done(null, false, req.flash("errors", "wrong password. Please try again")); // case no match return (no errors, don't return user , flash message)
                    }
                }
            } catch (err) {
                return done(null, false, err);
            }
        }));
}

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    loginService.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null);
    });
});


module.exports = initPassportLocal;

