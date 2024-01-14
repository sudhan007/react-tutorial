import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
    categoryName:{ type: String},
    date: { type: Date, default: Date.now() },
    
});

const _model = model("category", CategorySchema);

export { _model as categorymodel };