const db = require("../configs/connectingDB");  // step [4] in setting passport
const promise = require("promise");
const { resolve, reject } = require("promise");
const bcrypt = require("bcrypt");


let findUserByEmail = (email) => {
    return new promise((resolve, reject) => {
        try {
            db.query("SELECT * FROM users WHERE username = ?", email, function (error, rows) {
                if (error){
                    reject(error);
                }
                let user = rows[0];
                resolve(user);
            });
        } catch (err) {
            reject(err);
        }
    });
}



let compairPassword = (user, password) => {
    return new promise((resolve, reject) => {
        try {
             console.log("the user object to compaire password is " + user);
            let isMatch = bcrypt.compareSync(password, user.password);
             console.log("entered passrod = " + password + " the hashed password = " + user.password);
            if (isMatch === true) {
                resolve(true);
            }
            else{
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    });
}



let findUserById = (id)=>{
    return new promise((resolve, reject)=>{
        try{
            db.query("SELECT * FROM users WHERE id = ?", id, function(error, rows){
                if(error) reject(error);
                let user = rows[0];
                resolve(user);
            });
        } catch (e){
            reject(e);
        }
    });
}



module.exports = {
    findUserByEmail: findUserByEmail,
    compairPassword: compairPassword,
    findUserById:findUserById
}
