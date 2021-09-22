const db = require("../configs/connectingDB");
const bcrypt = require("bcrypt");
const promise = require("promise");
const { resolve, reject } = require("promise");

let createUser = (user) => {
    return new promise(async (resolve, reject) => {
        console.log("entering the registerService.js");
        try {
            //check email is exist or not
            let check = await checkEmailUser(user.username);
            console.log("the passed check answer is " + check);
            if (check) {
                reject(`The email: ${user.username}  already exist. please login with the provided user OR create new user`);
            } else {
                // hash user password
                let salt = bcrypt.genSaltSync(10);
                let data = {
                    fullname:user.fullname,
                    username: user.username,
                    password: bcrypt.hashSync(user.password,salt)
                };

                db.query("INSERT INTO users SET ?", data, function (error, rows){
                    if (error){
                        reject(error);
                    }
                    resolve("User created successfully.");

                });
            }


        } catch (e) {
            reject(e);
        }
    });
};

let checkEmailUser = (username) => {
    return new promise((resolve, reject) => {
        try {

            db.query("SELECT * FROM users WHERE username= ?", username, function (error, rows) {
                console.log(rows.length);
                if (error) {
                    reject(error);
                }
                if (rows.length > 0) {
                    console.log("answer is true");
                    resolve(true);
                } else {
                    console.log("answer is false");
                    resolve(false);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}








module.exports = {
    createUser: createUser
};