import { genSalt } from "bcrypt";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, phonenumber, gender,answer } = req.body;

        //validations
        if (!fullname) {
            return res.send({ error: "Name is Required" });
        }
        if (!gender) {
            return res.status(400).json({ message: "Gender is Required" });
        }
        if (!username) {
            return res.status(400).json({ message: "Username is Required" });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is Required" });
        }
        if (!phonenumber) {
            return res.status(400).json({ message: "Phone no is Required" });
        }
        if (!confirmpassword) {
            return res.status(400).json({ message: "Confirm password required" });
        }
        if (!answer) {
            return res.status(400).json({ message: "Answer is required" });
        }

        if (password != confirmpassword) {
            return res.status(400).json({ error: "Passwords dont match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(201).json({ error: "Username already exists" })
        }

        // Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        //Creating new user
        const newUser = new User({
            fullname,
            username,
            password: hashedpassword,
            phonenumber,
            gender,
            answer
        });

        await newUser.save();

        generateTokenAndSetCookie(res, newUser._id);

        res.status(301).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            phonenumber: newUser.phonenumber
        })

    } catch (error) {
        console.log(`Error in Register page ${error}`);
        res.status(501).json({ error: "Internal server error" });
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username) {
            return res.status(201).json({ message: "Username is Required" });
        }
        if (!password) {
            return res.status(201).json({ message: "Password is Required" });
        }
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(201).json({ error: "Invalid username or password" })
        }

        generateTokenAndSetCookie(res, user._id);

        res.status(301).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            phonenumber: user.phonenumber
        })

    } catch (error) {
        console.log(`Error in Login page ${error}`);
        res.status(501).json({ error: "Internal server error" });
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out Succesfully" });
    } catch (error) {
        console.log(`Error in Logout controller ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const forgotpassword = async (req, res) => {
    try {
        const { username, phonenumber,answer, newPassword, } = req.body;
        if (!username) {
            return res.status(201).json({ message: "Username is Required" });
        }
        if (!phonenumber) {
            return res.status(201).json({ message: "Phone number is Required" });
        }
        if (!newPassword) {
            return res.status(201).json({ message: "NewPassword is Required" });
        }

        const user = await User.findOne({ username, phonenumber,answer });
        if (!user) {
            res.status(301).json({ error: "Wrong username or phone number or answer" })
        }

        // Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
        res.status(200).json({ message: "Passsword changed Succesfully" });
    } catch (error) {
        console.log(`Error in Forgot password controller ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}