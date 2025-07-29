const jwt = require('jsonwebtoken');
const express = require("express");
const User = require("../models/users");
const Session = require('../models/session')
const router = express.Router();
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
require('dotenv').config()


const JWT_SECRET = process.env.JWT_SECRET;


const generateToken = (userId) => {
    console.log(`userId:::`, 123456)
    console.log(`JWT`, JWT_SECRET)
    // return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "2d" });
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "2d" });
};


router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !password || !email) {
            return res.send({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const data = new User({ email, username, password: hashedPassword, isVerified: false });
        await data.save();

        const token = generateToken(data._id);
        // 📧 Send confirmation email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "aabdullahaslam91@gmail.com",
                pass: process.env.GOOGLE_APP_PASSWORD  // Use App Password, NOT your actual Gmail password
            }
        });

        const verifyUrl = `http://localhost:5000/auth/verify/${token}`;

        const mailOptions = {
            from: "aabdullahaslam91@gmail.com",
            to: email,
            subject: "Welcome to Our App!",
            html: `
                <h3>Hello ${username},</h3>
                <p>Thank you for registering. Please verify your email to activate your account.</p>
                <a href="${verifyUrl}">${verifyUrl}</a>
                <p>Regards,<br/>Team</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.send({ message: "User created successfully. Check your email.", user: data });

    } catch (error) {
        console.log("error::::", error);
        if (error?.errorResponse?.errmsg?.includes("duplicate key error")) {
            return res.send({ message: "Email already registered" });
        }
        res.status(500).send({ message: "Server error", error });
    }
});


router.get("/verify/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).send({ message: "User not found" });

        if (user.isVerified) {
            return res.send({ message: "User already verified" });
        }

        user.isVerified = true;
        await user.save();

        res.send({ message: "Email verified successfully!" });
    } catch (error) {
        res.status(400).send({ message: "Invalid or expired token" });
    }
});


// GOOGLE APP PASSWORD : donk akio ysmm uubl
// router.post("/register", async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         if (!username || !password || !email) {
//             return res.send({ message: "All fields are required" });
//         }
//         const hashedPassword = await bcrypt.hash(password, 12);
//         // console.log(hashedPassword);
//         // res.send(hashedPassword)

//         const data = await new User({ email, username, password: hashedPassword });
//         await data.save();

//         return res.send({ message: "user created succesfully", user: data });
//     } catch (error) {
//         console.log("error::::", error);
//         if (error?.errorResponse?.errmsg.includes("duplicate key error")) {
//             return res.send({ message: "Email already registered" });
//         }
//     }
// });


router.post("/login", async (req, res) => {
    try {
        console.log("CHECK BODY");
        
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        
        
        const emailExist = await User.findOne({ email });
        console.log(emailExist);
        
        if (!emailExist) {
            return res.status(401).send({ message: "Account Not Found" });
        }
        console.log("CHECK BODY 1");
        
        if (!emailExist.isVerified) {
            return res.status(400).send({ message: "Please verify your email first." });
        }
        console.log("CHECK BODY 2");

        console.log("Hello Match");
        const isMatch = await bcrypt.compare(password, emailExist.password);
        console.log("Hello Match 2");
        console.log(isMatch);


        if (!isMatch) {
            return res.send({ message: "Password Incorrect" });
        }
        console.log('Code is running , Pasword Matched .....')

        const token = generateToken(emailExist._id);

        console.log(`Token:::`, token)

        res.cookie('token', token, {
            secure: true,
            maxAge: 2 * 24 * 60 * 60 * 1000
        })

        return res.send({
            message: "Login Success",
            user: { email: emailExist.email, username: emailExist?.username, userId: emailExist?._id },
            token: token,
        });
    } catch (error) {
        return res.status(300).send({ message: 'Login Failed', error: error })
    }
});


router.post('/session', async (req, res) => {
    try {
        const { userId, token } = req.body;
        console.log(userId);
        console.log(token);

        if (!userId || !token) {
            res.send("User and Token are needed");
        }

        const data = await Session.findOneAndUpdate(
            { user: userId },
            { user: userId, token },
            { upsert: true, new: true }
        );
        // const data = await Session({ token: token, user: user });
        await data.save()

        return res.send({
            message: "Session Success"
        });

    } catch (error) {
        return res.status(300).send({ message: 'Session Failed', error: error })
    }


})

router.get('/getSession/:token', async (req, res) => {
    try {
        // const { token } = req.body;
        const { token } = req.params;
        console.log(token);

        const data = await Session.find({ token });
        console.log(data);

        return res.send({ success: true, users: data })
    } catch (error) {
        return res.status(300).send({ message: 'Error Fetching Data', error: error })
    }
})

module.exports = router;