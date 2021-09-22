
let getLoginPage = (req, res)=>{
    return res.render("loginPage",{
        errors: req.flash("errors")
    });
}


// check if the user is authenticated to login
let checkLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){ // user is Authenticated
        return res.redirect("/");
    }
    next();
}

let checkLoggedOut = (req, res, next)=>{
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
}





let postLogOut = (req, res)=>{
    req.session.destroy(function(err){
        return res.redirect("/login");
    });
}



module.exports = {
    getLoginPage:getLoginPage,
    checkLoggedIn:checkLoggedIn,
    checkLoggedOut:checkLoggedOut,
    postLogOut:postLogOut
}