import userModel from "../Modules/userModule.js";
import { comparePassword, hashPassword } from "../utility/auth.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, mobile, password, address, otp } = req.body;

    if (!name) {
      return res.send({
        message: "Name Required ",
      });
    }
    if (!email) {
      return res.send({
        message: "Email Required  ",
      });
    }
    if (!mobile) {
      return res.send({
        message: "Mobile Required ",
      });
    }
    if (!password) {
      return res.send({
        message: "Password Required ",
      });
    }
    if (!address) {
      return res.send({
        message: "address Required  ",
      });
    }
    if (!otp) {
      return res.send({
        message: "otp Required  ",
      });
    }
    // Check user
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(201).send({
        sucess: false,
        message: "User Already Exit",
      });
    }
    const hashedPassword = await hashPassword(password);

    //  New user
    const user = await new userModel({
      name,
      email,
      mobile,
      password: hashedPassword,
      address,
      otp,
    }).save();
    res.status(201).send({
      sucess: true,
      message: "User Register Sucessfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "fill all details",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(500).send({
        message: "Please Provide email & Password ",
      });
    }
    if (!password) {
      return res.status(500).send({
        message: "Please Provide  Password ",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        message: "Email not register",
        sucess: false,
      });
      console.log(user);
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.status(404).send({
        sucess: false,
        message: "Password not match",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(200).send({
      sucess: true,
      message: "Login Sucessfully",
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "Please Provide Valid Email & Password",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email) {
      res.status(404).send({
        sucess: false,
        message: "Please Provide Email",
      });
    }
    if (!otp) {
      res.status(404).send({
        sucess: false,
        message: "Please Provide OTP",
      });
    }
    if (!newPassword) {
      res.status(404).send({
        sucess: false,
        message: "Please Provide newPassword",
      });
    }
    const user = await userModel.findOne({ email, otp });
    if (!user) {
      res.status(404).send({
        sucess: false,
        message: "User not found wrong email & otp",
      });
    }
    const hashed = await hashPassword({ newPassword });
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      sucess: true,
      message: "Password reset Sucessufully",
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "something went wrong,error",
      error,
    });
  }
};

export const testController = async (req, res) => {
  res.send({
    message: "Tested token",
  });
};
