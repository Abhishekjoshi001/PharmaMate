import User from "../models/userModel.js";

export const updateProfile = async (req, res) => {
  try {
    const { fullname, phonenumber, gender ,password} = req.body;

    // Fetch the user from the request object 
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields only if new data is provided
    user.fullname = fullname || user.fullname;
    user.phonenumber = phonenumber || user.phonenumber;
    user.gender = gender || user.gender;
    user.password= password || user.password

    // Save the updated user information
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      username: updatedUser.username,
      phonenumber: updatedUser.phonenumber,
      gender: updatedUser.gender,
      password:updatedUser.password
    });

  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
