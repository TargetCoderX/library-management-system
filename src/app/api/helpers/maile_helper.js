const nodemailer = require('nodemailer');

/* forst mail server */
let transporter1 = nodemailer.createTransport({
    pool: true,
    host: process.env.MAILER1_HOST,
    port: process.env.MAILER1_PORT,
    secure: process.env.MAILER1_PORT === 465 ? true : false, // true for 465, false for other ports
    auth: {
        user: process.env.MAILER1_USERNAME,
        pass: process.env.MAILER1_PASSWORD,
    },
});

/* second mail server */
/* let transporter2 = nodemailer.createTransport({
    pool: true,
    host: "smtp.example.com",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: "username",
        pass: "password",
    },
}); */

export const accountMailer = (to, subject, text = '', html = '', callback) => {
    transporter1.sendMail({
        from: process.env.MAILER1_USERNAME,
        to,
        subject,
        text,
        html
    }, (error, info) => {
        if (error) {
            return callback(error);
        }
        return callback(null, info);
    });
}

/* const bookMailServer = () => {

} */