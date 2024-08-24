dotenv = require('dotenv')
const nodemailer = require('nodemailer')

dotenv.config()
const email = process.env.NODEMAILER_EMAIL
const password = process.env.NODEMAILER_PASSWORD

const sendEmailTest = async (emails,subject,text,textHTML) => {
    try{
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.etheral.email",
            port:587,
            secure: false,
            auth:{
                user: testAccount.user,
                pass: testAccount.pass,
            }
        })
        let message = {
            from:'"Quiksites Support Team" <support@quiksites.com>',
            to: emails,
            subject,
            text,
            html: textHTML
        }
        transporter.sendMail(message).then(() => {
            console.log("Email was sent as requested")
        }).catch((error) => {
            console.log(error)
        })
    }catch(error){
        console.log("there was a problem sending th requested email:", error);
    }
}

const sendEmail = async (emails,subject,text,textHTML) => {
    let config = {
        host:'smtp.gmail.com',
        auth:{
            type:"login",
            user:email,
            pass:password
        }
    }
    let message = {
        from:'"Quiksites Support Team" <ai@quikwebsites.com>',
        to: emails,
        subject,
        text,
        html: textHTML
    }
    try{
        let transporter = nodemailer.createTransport(config)

        transporter.sendMail(message).then(() => {
            console.log("Email was sent as requested")
        }).catch((error) => {
            console.log(error)
        })
    }catch(error){
        console.log("there was a problem sending the requested email:", error);
    }
}

module.exports = {
    sendEmailTest,
    sendEmail
};