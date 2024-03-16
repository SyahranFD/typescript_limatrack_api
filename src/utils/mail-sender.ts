import nodemailer from 'nodemailer';
import {logger} from "../application/logging";
export const mailSender = async (email: string, title: string, body: string) => {
    try {
        // Create a Transporter to send emails
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            }
        });
        // Send emails to users
        let info = await transporter.sendMail({
            from: 'Lima Track APP',
            to: email,
            subject: title,
            html: body,
        });
        logger.debug("Email info: ", info);
        return info;
    } catch (e) {
        logger.debug("Error sending email: " + e);
    }
};
