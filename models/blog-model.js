const { Schema, model } = require("mongoose");

//Fixed item master
const blogSchema = new Schema(
  {
    name: { type: String, required: true },
    category_id: { type: String, required: true },
    main_image: { type: String },       // file path
    feature_image: { type: String },    // file path
    createdBy :{ type: String},
    date: { type: String, required: true },
    author_name: { type: String, required: true },
    short_description: { type: String, required: true },
    details: { type: String, required: true },
    main_image: { type: String },
        status: { type: Number, default: 1 }, // ✅ active by default
 createdAt: { type: String },
   url: { type: String },
  },
 
);







const Blog = new model("blog", blogSchema);

module.exports = { Blog };
