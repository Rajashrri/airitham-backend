// models/client-model.js
const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String },
  status: { type: String },
  createdAt: { type: String },
      createdBy :{ type: String},
    image: { type: String },


});

module.exports = model('client', clientSchema); // ✅ default export
