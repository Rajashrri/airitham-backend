const { Schema, model } = require("mongoose");

const blogcategorySchema = new Schema({
  name: { type: String, required: true },
  url: { type: String },
  status: { type: String },
  createdBy: { type: String },
  createdAt: { type: String },
});

module.exports = model("BlogCategory", blogcategorySchema);