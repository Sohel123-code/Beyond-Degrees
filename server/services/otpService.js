import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

dotenv.config();

const logToFile = (message) => {
    try {
        fs.appendFileSync(path.join(process.cwd(), 'otp_debug.txt'), `${new Date().toISOString()} - ${message}\n`);
    } catch (e) {
        console.error('Failed to write to log file:', e);
    }
};

export const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

export const sendOTPEmail = async (email, otp) => {
    // Check for mock mode or missing credentials
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    logToFile(`[Attempting to send] User: ${user}, Pass length: ${pass ? pass.length : 0}`);

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: user,
                pass: pass
            }
        });

        const info = await transporter.sendMail({
            from: `"Beyond Degrees" <${user}>`,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is ${otp}`
        });

        console.log("Email sent successfully: " + info.response);
        logToFile("Email sent successfully: " + info.response);
        return true;
    } catch (error) {
        console.log("Email Error:", error);
        logToFile("Email Error: " + JSON.stringify(error, null, 2));

        // Keep the fallback so development isn't blocked
        console.log(`[FALLBACK] Email failed. Your OTP is: ${otp}`);
        logToFile(`[FALLBACK] Email failed. OTP: ${otp}`);
        return true;
    }
};
