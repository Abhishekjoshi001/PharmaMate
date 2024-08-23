import User from "../models/userModel.js";

export const updateProfile = async (req,res)=>{
    try {
        const {fullname,phonenumber,gender} = req.body;
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        user.fullname = req.body.fullname||user.fullname;
        user.phonenumber = req.body.phonenumber||user.phonenumber;
        user.fullname = req.body.gender||user.gender;
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            fullname: updatedUser.fullname,
            username: updatedUser.username,
            phonenumber: updatedUser.phonenumber,
            // Add other fields as necessary
        });

    } catch (error) {
        console.error("Error in updateProfile controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}