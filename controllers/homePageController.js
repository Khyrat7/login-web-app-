// const express = require("express");

let getHomePage = (req, res)=>{
    return res.render("homePage", {
        user:req.user
    });
}


module.exports = {
    getHomePage:getHomePage
}