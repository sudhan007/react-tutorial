import { model, Schema } from "mongoose";

const SubcategorySchema = new Schema({
    subcategoryname: String,
    categoryName: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    
    date: { type: Date, default: Date.now() },
});


const subcategorymodel = model("subcategory", SubcategorySchema);

export { subcategorymodel };