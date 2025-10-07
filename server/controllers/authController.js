import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import transporter from '../config/nodemailer.js'


export const register = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.json({
            success: false,
            message: 'Missing Details'
        })
    }

    try {
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.json({
                success: false,
                message: 'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel({
            name,
            email,
            password: hashedPassword
        })
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        //Sending welcome email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Auth-App',
            text: `Welcome to Auth-App. Your account has been created with email id: ${email}`
        }

        await transporter.sendMail(mailOptions);


        res.json({success: true})

    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success: false, message: 'Email and Password are required'});
    }
    
    try {
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success:false, message: 'Invalid Email'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success: false, message: 'Invalid Password'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({success: true})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({success: true, message: 'Logged Out'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

//Semd Verification OTP to the User's Email
export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({success: false, message: 'Account already verified'})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Account Verification OTP",
          text: `Your OTP is ${otp}. Verify your account using this OTP.`,
        };
        await transporter.sendMail(mailOptions);

        res.json({success: true, message: 'Verification OPT Sent on Email'})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const verifyEmail = async (req, res) => {

  //const {userId, otp} = req.body;
   const { otp } = req.body; // OTP comes from request body
   const userId = req.userId; 

  //console.log(userId, otp);

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

