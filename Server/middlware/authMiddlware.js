import JWT from "jsonwebtoken";
import userModel from "../Modules/userModule.js";

// used as amiddlware to protect route

export const signIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
// Admin access middlware

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== true) {
      return res.status(404).send({
        sucess: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send({
      message: "Error in Admin middlware",
      sucess: false,
    });
  }
};
