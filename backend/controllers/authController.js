import { genSalt } from "bcrypt";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const register = async (req, res) => {
    console.log("Request body:", req.body);
    try {
        const { fullname, username, password, confirmpassword, phonenumber, gender, answer } = req.body;
        // Validations
        if (!fullname) {
            return res.status(400).json({ error: "Name is Required" });
        }
        if (!gender) {
            return res.status(400).json({ error: "Gender is Required" });
        }
        if (!username) {
            return res.status(400).json({ error: "username is Required" });
        }
        if (!password) {
            return res.status(400).json({ error: "password is Required" });
        }
        if (!phonenumber) {
            return res.status(400).json({ error: "Phone no is Required" });
        }
        if (!confirmpassword) {
            return res.status(400).json({ error: "Confirm password required" });
        }
        if (!answer) {
            return res.status(400).json({ error: "Answer is required" });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "passwords don't match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ error: "username already exists" });
        }
        console.log("1st");

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        // Creating new user
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

        // Sending the response only once
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                phonenumber: newUser.phonenumber
            }
        });


    } catch (error) {
        console.log(`Error in Register page ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username) {
            return res.status(400).json({ message: "username is Required" });
        }
        if (!password) {
            return res.status(400).json({ message: "password is Required" });
        }
        const user = await User.findOne({ username });
        const ispasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !ispasswordCorrect) {
            return res.status(401).json({ error: "Invalid username or password" })
        }

        const token = generateTokenAndSetCookie(res, user._id);

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
              _id: user._id,
              name: user.name,
              phone: user.phone,
              gender: user.gender,
              role: user.role,
            },
            token,
          });

    } catch (error) {
        console.log(`Error in Login page ${error}`);
        res.status(404).json({ error: "Internal server error" });
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).send({ success:true,message: "Logged out Succesfully" });
    } catch (error) {
        console.log(`Error in Logout controller ${error}`);
        res.status(404).json({ error: "Internal server error" });
    }
};

export const forgotpassword = async (req, res) => {
    try {
        const { username, phonenumber,answer, newpassword, } = req.body;
        if (!username) {
            return res.status(401).json({ message: "username is Required" });
        }
        if (!phonenumber) {
            return res.status(401).json({ message: "Phone number is Required" });
        }
        if (!newpassword) {
            return res.status(401).json({ message: "Newpassword is Required" });
        }

        const user = await User.findOne({ username, phonenumber,answer });
        if (!user) {
            res.status(404).json({ error: "Wrong username or phone number or answer" })
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(newpassword, salt);

        await User.findByIdAndUpdate(user._id, { password: hashedpassword });
        res.status(200).json({ message: "Passsword changed Succesfully" });
    } catch (error) {
        console.log(`Error in Forgot password controller ${error}`);
        res.status(404).json({ error: "Internal server error" });
    }
}