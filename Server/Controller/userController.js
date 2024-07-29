import userModel from "../Modules/userModule.js";
import { comparePassword, hashPassword } from "../utility/auth.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, mobile, password, address } = req.body;
    console.log(req.body);
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

    if (!email || !password) {
      return res.status(500).send({
        message: "Please Provide email & Password ",
      });
    }
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send({
        message: "Email not register",
        sucess: false,
      });
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

export const testController = async (req, res) => {
  res.send({
    message: "Tested token",
  });
};
