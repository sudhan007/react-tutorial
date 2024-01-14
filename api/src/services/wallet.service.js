import { WalletModel } from "../models/index.js";


export const WalletService = {
  // Create a new category
  create: async (request, reply) => {
    try {
      const{plan,offer,amount,requestcount,bestseller,premium}=request.body
      const existingWallet = await WalletModel.findOne({ plan });

    if (existingWallet) {
      return { ok: false, message: "Plan already exists" };
    }
      const newWallet = await WalletModel.create({
        plan,offer,amount,requestcount,bestseller,premium
      });
     
      return { data: newWallet, ok: true, message: "Wallet created successfully" };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  // Get all categories
  getall: async (request, reply) => {
    try {
      const page = parseInt(request.query.page) || 1;
const limit = parseInt(request.query.limit) || 10;

      const wallet = await WalletModel.find()
        
        .skip((page - 1) * limit)
        .limit(limit);
    const count = await WalletModel.countDocuments();
    

    return { data: wallet, ok: true, message: "Wallet retrieved successfully",count };
    } catch (error) {
      return { ok: false, message: "Internal Server Error" };
    }
  },

  // Get a specific category by ID
  get: async (request, reply) => {
    try {
      const walletCategory = await WalletModel.findById(request.params.id);
      if (!walletCategory) {
        return{ ok: false, message: "wallet not found" };
        
      }
      return{ data: walletCategory, ok: true, message: "wallet retrieved successfully" };
    } catch (error) {
      return{ ok: false, message: "Internal Server Error" };
    }
  },

  // Update a category by ID
  update: async (request, reply) => {
    try {
      const updatedWallet = await WalletModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );
      if (!updatedWallet) {
        return{ ok: false, message: "Wallet not found" };
        return;
      }
      return{ data: updatedWallet, ok: true, message: "Wallet updated successfully" };
    } catch (error) {
      return{ ok: false, message: "Internal Server Error" };
    }
  },

  // Delete a category by ID
  delete: async (request, reply) => {
    try {
      const deletedwallwtCategory = await WalletModel.findByIdAndDelete(request.params.id);
      if (!deletedwallwtCategory) {
        return{ ok: false, message: "Wallet delete not found" };
        
      }
      return{ data: deletedwallwtCategory, ok: true, message: "Wallet deleted successfully" };
    } catch (error) {
      return{ ok: false, message: "Internal Server Error" };
    }
  },

};
