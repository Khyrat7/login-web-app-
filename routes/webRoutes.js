const express = require("express");
const homePageController = require("../controllers/homePageController");
const loginPageController = require("../controllers/loginPageController");
const registerPageController = require("../controllers/registerPageController");
const auth = require("../validation/authValidation");
const passport = require("passport"); /// step [1] in setting the passport
const initPassportLocal = require("../controllers/passportLocalController");


let router = express.Router();

initPassportLocal();


let initWebRouter = (app) => {

    // Home Page route
    router.get("/",loginPageController.checkLoggedOut, homePageController.getHomePage);


    // Login Page route
    router.get("/login",loginPageController.checkLoggedIn, loginPageController.getLoginPage);
    router.post("/login", passport.authenticate("local",{
        // setting the passport authentication object //////  step [2] in setting the passport
        successRedirect:"/",
        failureRedirect: "/login",
        successFlash:true,
        failureFlash: true
    }));

    // logout route
    router.post("/logout", loginPageController.postLogOut);


    // Register Page route
    router.get("/register", registerPageController.getRegisterPage);
    router.post("/register", auth.validateRegister,registerPageController.createNewUser);

    return app.use("/", router);
}

module.exports = initWebRouter;