import slugify from "slugify";
import categoryModel from "../Modules/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send({
        message: "Name is Required",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(200).send({
        sucess: true,
        messgae: "Categaory Already Exit",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(200)
      .send({ sucess: true, messgae: "New Category Created", category });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "Error In Category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      sucess: true,
      messgae: "Category updated Sucessfully",
      updatedCategory,
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "Error While update Category",
      error,
    });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      sucess: true,
      message: "All category",
      count: category.length,
      category,
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "Error in getAll Category",
      error,
    });
  }
};
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      sucess: true,
      message: "Category based on slug",
      category,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      messgae: "Error to fetch single category",
    });
  }
};
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      sucess: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
