import {SubcategoryModel} from "../models/index.js";

export const SubcategoryService = {
  // Create a new category
  create: async (request, reply) => {
    try {

      const {subcategoryname, categoryName} = request.body

      const newSubcategory = await SubcategoryModel.create({
        subcategoryname,
        categoryName,
      });
      return { data: newSubcategory, ok: true, message: "Sub Category created successfully" };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" }
    }
  },

  // Get all categories
  getall: async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
const limit = parseInt(request.query.limit) || 10;
  
        const subcategories = await SubcategoryModel.find()
        .populate("categoryName")
          .skip((page - 1) * limit)
          .limit(limit);
      const count = await SubcategoryModel.countDocuments();
      
      return { data: subcategories, ok: true, message: "Subcategories retrieved successfully",count };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  },

  // Get a specific category by ID
  get: async (request, reply) => {
    try {

      const {id} = request.params

      const subcategory = await SubcategoryModel.findById(id).populate("category")
      if (!subcategory) {
        return { ok: false, message: "Subcategory not found" };
      }
      return { data: subcategory, ok: true, message: "Subcategory retrieved successfully" };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  // Update a category by ID
  update: async (request, reply) => {
    try {
      const updatedSubcategory = await SubcategoryModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );
      if (!updatedSubcategory) {
        reply.status(404).send({ ok: false, message: "Subcategory not found" });
        return;
      }
      return{ data: updatedSubcategory, ok: true, message: "Subcategory updated successfully" };
    } catch (error) {
      return{ ok: false, message: "Internal Server Error" };
    }
  },

  // Delete a category by ID
  delete: async (request, reply) => {
    try {
      const deletedSubcategory = await SubcategoryModel.findByIdAndDelete(request.params.id);
      if (!deletedSubcategory) {
        reply.status(404).send({ ok: false, message: "Subcategory not found" });
        return;
      }
      return{ data: deletedSubcategory, ok: true, message: "Subcategory deleted successfully" };
    } catch (error) {
      return{ ok: false, message: "Internal Server Error" };
    }
  },

  search: async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 10;
      const { query } = request.query; 

      // Perform the search operation based on your requirements
      const searchResults = await SubcategoryModel
      .find({ subcategoryname: { $regex: new RegExp(query, 'i') } })
      .skip((page - 1) * limit)
      .populate("categoryName")
          .limit(limit);
          const count = await SubcategoryModel
          .countDocuments({ subcategoryname: { $regex: new RegExp(query, 'i') } });

      return{ data: searchResults, ok: true, message: "SubCategories retrieved successfully",count };
    } catch (error) {
      console.error('Error in SubCategoryController.search:', error);
      return{ ok: false, message: "Internal Server Error" };
    }
  },

  showall: async (request, reply) => {
    try {
      const categoryId = request.query.categoryId;

      let subcategories;

      if (categoryId) {
        subcategories = await SubcategoryModel.find({ categoryName: categoryId }).populate("categoryName");
      } else {
        subcategories = await SubcategoryModel.find().populate("categoryName");
      }

      return {
        data: subcategories,
        ok: true,
        message: "Subcategories retrieved successfully",
      };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

};
