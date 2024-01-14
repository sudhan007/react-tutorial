import { model, Schema } from "mongoose";

const walletSchema = new Schema({
  plan:{
    type:String,
    unique:true,
    required:true,
  },
  offer: Number,
  amount: Number,
  requestcount: Number,
  bestseller: {
    type: Boolean, 
    
  },
  premium: {
    type: Boolean, 
   
  },
  date: { type: Date, default: Date.now() },
});

const _model = model("wallet", walletSchema);

export { _model as walletmodel };