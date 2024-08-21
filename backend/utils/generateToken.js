import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (res, userId)=> {

    // Generate a JWT token
    const token = jwt.sign({id:userId}, process.env.JWT_SECRET, { expiresIn: '15d' }); 


    // Set the cookie with the generated token
    res.cookie(jwt, token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie

        secure: process.env.NODE_ENV !== 'development',

        maxAge: 15*24*60*60*1000, //15days expiration
        
        sameSite: 'strict' // Strict same-site policy
    });
}

export default generateTokenAndSetCookie;