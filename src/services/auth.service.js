const jsonToken = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const db = require('../../configs/connect');
const {
    hash
} = require('bcrypt');
const responseHandler = require('../handleResponse');

const TOKEN_SECRET = crypto.randomBytes(64).toString('base64');
let authService = {};
authService.getSession = (req, res, next) => {  
    // console.log(req.headers);
    const token = req.headers['authorization'].split(' ')[1];
    jsonToken.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            // responseHandler.error("Unauthorized request!",)
            res.status(401).send({
                response_code: "01",
                response_message: "Unauthorized request!"
            })
        } else {
            req.user = user;
            console.log(req.user);
            next();
        }
    })
}
authService.userLogin = (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        db.query(`SELECT * FROM users WHERE username="${username}" AND password="${password}"`, (err, result) => {
            // console.log(err);
            if (err) {
                res.send({
                    success: false,
                    message: "Incorrect  credentials"
                })
            } else {
                user = result[0];
                const generateToken = jsonToken.sign({
                    username: user.username,
                    email: user.email,
                    phone: user.phone_number
                }, TOKEN_SECRET, {
                    expiresIn: "1h",
                })
                res.send({
                    token: generateToken,
                    response_message: "Login successful",
                    response_code: "00"
                });
            }
        })
    } catch (error) {
        console.log("Error", error);
    }
}
authService.createUsers = (req, res) => {
    console.log(req.body);

    bcrypt.genSalt((err, salt) => {
        const {
            username,
            firstname,
            lastname,
            email,
            phone_number,
            dob,
            password
        } = req.body;
        db.query(`SELECT * FROM users WHERE email =?`, [email], (err, createdUser) => {
            if (createdUser[0]?.email) {
                res.send({
                    response_code: "01",
                    response_message: "Email already taken!"
                })
            } else {
                bcrypt.hash(password, salt, (err, hash) => {
                    let sql = `INSERT INTO users (username, first_name, last_name, email, phone_number, dob, password)  
            VALUES("${username}", "${firstname}", "${lastname}", "${email}", "${phone_number}", "${dob}", "${hash}")`;
                    db.query(sql, (err, result) => {

                        if (err) {
                            res.status(400).send({
                                response_code: "01",
                                response_message: "User couldn\'t be created !" + err.message
                            })
                        } else {
                            db.query(`SELECT username, first_name, last_name, email FROM users WHERE username =? LIMIT 1`, [username], (err, createdUser) => {
                                if (err) {
                                    res.send({
                                        response_code: "01",
                                        response_message: "User couldn\'t be created !"
                                    })
                                } else {
                                    // responseHandler.success("Successful user creation!", createdUser, 00)
                                    res.send({
                                        response_code: "00",
                                        response_message: "Successful user creation",
                                        data: createdUser
                                    })
                                }
                            })

                        }
                    })


                })
            }
        })
    })


}
module.exports = authService;