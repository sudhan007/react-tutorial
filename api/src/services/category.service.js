import { CategoryModel } from "../models/index.js";


export const CategoryService = {

  // Create a new category
  create: async (request, reply) => {
    try {
      const { categoryName } = request.body;
      const newCategory = await CategoryModel.create({
        categoryName:categoryName,
      });
      return { data: newCategory, ok: true, message: "Category created successfully" };
    } catch (error) {
      console.error(error);
      return { ok: false, message: "Internal Server Error" };
    }
  },
  

  // Get all categories
  getall: async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 10;
  
      const categories = await CategoryModel.find()
      
      .skip((page - 1) * limit)
      .limit(limit);
    const count = await CategoryModel.countDocuments();
    return { data: categories, ok: true, message: "Categories retrieved successfully", count };
     
    } catch (error) {
      console.error(error);
      return { ok: false, message: "Internal Server Error" };
    }
  },
  

  // Get a specific category by ID
  get: async (request, reply) => {
    try {
      const {id} = request.params
      const category = await CategoryModel.findById(id);
      if (!category) {
        return{ ok: false, message: "Category not found" };
        
      }
      return{ data: category, ok: true, message: "Category retrieved successfully" };
    } catch (error) {
      return{ ok: false, message: "Internal Server Error" };
    }
  },

  // Update a category by ID
  update: async (request, reply) => {
    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );
      if (!updatedCategory) {
        return{ ok: false, message: "Category not found" };
        return;
      }
      return{ data: updatedCategory, ok: true, message: "Category updated successfully" };
    } catch (error) {
      return{ ok: false, message: "Internal Server Error" };
    }
  },

  // Delete a category by ID
  delete: async (request, reply) => {
    try {
      const deletedCategory = await CategoryModel.findByIdAndDelete(request.params.id);
      if (!deletedCategory) {
        return{ ok: false, message: "Category not found" };
        return;
      }
      return{ data: deletedCategory, ok: true, message: "Category deleted successfully" };
    } catch (error) {
      return{ ok: false, message: "Internal Server Error" };
    }
  },

//   search category
search: async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 10;
      const { query } = request.query; 

      // Perform the search operation based on your requirements
      const searchResults = await CategoryModel
      .find({ categoryName: { $regex: new RegExp(query, 'i') } })
      .skip((page - 1) * limit)
      .limit(limit);
      const count = await CategoryModel
      .countDocuments({ categoryName: { $regex: new RegExp(query, 'i') } });


      return{ data: searchResults, ok: true, message: "Categories retrieved successfully",count };
    } catch (error) {
      console.error('Error in CategoryController.search:', error);
      return{ ok: false, message: "Internal Server Error" };
    }
  },
};
