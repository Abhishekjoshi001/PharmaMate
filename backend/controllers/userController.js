import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const updateProfile = async (req, res) => {
  try {
    const { fullname, phonenumber, gender, currentpassword, newpassword } = req.body;

    // Fetch the user from the request object 
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentpassword) {
      const isPasswordCorrect = await bcrypt.compare(currentpassword, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Invalid current password" });
      }
    }

    user.fullname = fullname || user.fullname;
    user.phonenumber = phonenumber || user.phonenumber;
    user.gender = gender || user.gender;

    if (newpassword) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newpassword, salt);
    }

    // Save the updated user information
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      username: updatedUser.username,
      phonenumber: updatedUser.phonenumber,
      gender: updatedUser.gender,
    });

  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
