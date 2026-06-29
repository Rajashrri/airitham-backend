// models/client-model.js
const { Schema, model } = require("mongoose");

const teamSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String },
    designation: { type: String },

  status: { type: String },
  createdAt: { type: String },
      createdBy :{ type: String},
    image: { type: String },


});

module.exports = model('team', teamSchema); // ✅ default export
