import slugify from "slugify";
import productModel from "../Modules/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, price, description, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //   validation
    switch (true) {
      case !name:
        return res.status(500).send({ erroe: "Name is required" });
      case !price:
        return res.status(500).send({ erroe: "price is required" });
      case !description:
        return res.status(500).send({ erroe: "description is required" });
      case !category:
        return res.status(500).send({ erroe: "category is required" });
      case !quantity:
        return res.status(500).send({ erroe: "quantity is required" });
      case photo && photo.size > 100000:
        return res
          .status(500)
          .send({ erroe: "photo is required and size less than 10mb" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    //   check for photo
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      sucess: true,
      message: "New Product Created",
      products,
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "Something went wrong in Product",
      error,
    });
  }
};

export const allProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      sucess: true,
      message: "All Products List",
      totalCount: products.length,
      products,
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "Something went wrong in Product",
      error,
    });
  }
};

export const singleProductController = async (req, res) => {
  try {
    const products = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      sucess: true,
      message: "Product Based on slug",
      products,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong in Product fatch", error });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);

    res.status(200).json({
      sucess: true,
      message: "Product Deleted sucefully",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Error while delete products",
      error,
    });
  }
};
