const { validationResult } = require("express-validator");
const registerService = require("../services/registerService");

let getRegisterPage = (req, res) => {
    return res.render("registerPage", {
        errors: req.flash("errors")
    });

}

let createNewUser = async (req, res) => {
    // validation for the user input and useing flash to pop alert messages 
    let errorsArr = [];
    let validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/register"); // in case there are alert messages, after adding them to the errorsArr redirect to the same page to relode
    }

    // Create a new user
    try {
        let newUser = {
            username: req.body.email,
            password: req.body.password,
            fullname: req.body.fullName
        };
        console.log(newUser);
        await registerService.createUser(newUser);
        return res.redirect("/login");

    } catch (e) {
        req.flash("errors", e);
        console.log(e);
        return res.redirect("/register");
    }




    console.log(req);
    console.log(req.body);
}

module.exports = {
    getRegisterPage: getRegisterPage,
    createNewUser: createNewUser
};