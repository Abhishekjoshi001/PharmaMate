import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const auth = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "No token provided, access denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
      return res.status(401).json({error:"Invalid Token"});
    }

     
    // Find user and attach to request object
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(401).json({ message: "Invalid token, access denied" });
  }
};

export default auth;