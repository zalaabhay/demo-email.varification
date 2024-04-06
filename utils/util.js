const nodemailer = require('nodemailer')

module.exports = {
    generateRandomString,
    sendMail
}


function generateRandomString() {
    try {
        let string = ''
        for (let i = 0; i < 8; i++) {
            const ch = Math.floor((Math.random() * 10) + 1)
            string += ch
        }
        return string
    } catch (error) {
        console.log("Error in generateRandomString " + error.message);
    }

}

function sendMail(emailUser,token) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'zalaabhay1808@gmail.com',
                pass: 'rsow xlus zapw ehtk' 
            }
        });
        let mailOptions = {
            from: 'zalaabhay1808@gmail.com',
            to: emailUser, 
            subject: 'Email Confirmation', 
            html: `<p>press <a href = http://localhost:3000/verify/${token}> here </a> to verify Your Email.</p><p>Thank You</p>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

    } catch (error) {
        console.log("Error in SendMail >>>>>>>>>>>>>>>>" + error.message);
    }
}