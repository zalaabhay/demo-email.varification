const db = require('../db')
const Utils = require('../utils/util')

module.exports = {
    createUser,
    emailVerification,
    adminLogin
}


function createUser(req, res) {
    return new Promise((resolve, reject) => {
        try {
            let message = ''
            let token = Utils.generateRandomString()
            let obj = {
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                pass: req.body.pass,
                isAdmin: req.body.isAdmin,
                token: token,
                isVerifiedMail: 0
            }
            let sqlQuery = `INSERT INTO user (fName,lName,email,pass,isAdmin,token,isVerifiedMail) VALUES ('${obj.fName}', '${obj.lName}','${obj.email}','${obj.pass}','${obj.isAdmin}','${obj.token}','${obj.isVerifiedMail}')`

            db.query(sqlQuery, function (err, result) {
                if (err) message = 'Error While Insert Record : ' + err.message;
                message = 'Record Inserted Successfully.'
                if (result.affectedRows == 1) {
                    Utils.sendMail(obj.email, obj.token)
                    message = 'Please Check Your Email For Verification.'
                    res.send({ "result": result, "message": message })
                } else {
                    res.send({ "result": null, "message": 'error While Insert Record' })
                }
            });
        } catch (error) {
            console.log("Error In createUser Is ", error.message);
        }

    })
}

async function emailVerification(req, res) {
    try {
        let message = ''
        let tokens = ''
        if (req.params) {
            tokens = req.params.token
            let sqlQuery = `SELECT * FROM user where token ='${tokens}'`

            await db.query(sqlQuery, function (err, result) {
                if (err) message = 'Error While Verify Email : ' + err.message;
                message = 'Email Verified Successfully'
                if (result[0]) {
                    let sqlQuery = `UPDATE user SET isVerifiedMail = '1' Where email = '${result[0].email}'`
                    db.query(sqlQuery, function (err, result) {
                        if (err) message = 'Error While Update Record : ' + err.message;
                        message = 'Record Updated Successfully.'
                        if (result.affectedRows == 1) {
                            return message
                        } else {
                            res.send({ "result": null, "message": 'error While Update Record' })
                        }
                    });
                    res.send({ "result": result, "message": message })
                } else {
                    res.send({ "result": null, "message": 'error While Verify Email' })
                }
            });
        } else {
            res.send({ "result": null, "message": 'Invalid Link' })
        }

    } catch (error) {
        console.log("Error Occure In emailVerification : ", error.message);
    }
}

function adminLogin(req, res) {
    try {
        let message = ''
        let email = req.body.email
        let pass = req.body.pass

        let sqlQuery = `SELECT * FROM user where email ='${email}' AND pass = '${pass}'`
        db.query(sqlQuery, function (err, result) {
            console.log("result>>>>>>", result);
            if (err) message = 'Error While Get Record : ' + err.message;
            if (result[0]) {
                if (result[0].isVerifiedMail != 1) {
                    result = null
                    message = 'Please Verify Your Email Address'
                } else if (result[0].isAdmin != 1) {
                    result = null;
                    message = 'You Are Not Allow To Login From Here'
                } else {
                    result = result
                    message = 'Login SuccessFully.'
                }
                res.send({ "result": result, "message": message })
            } else {
                res.send({ "result": null, "message": 'error While Get Record' })
            }
        });

    } catch (error) {
        console.log("Error Occure While adminLogin : ", error.message);
    }

}