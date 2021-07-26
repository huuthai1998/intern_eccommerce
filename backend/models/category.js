const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  parent: this,
});

module.exports = {
  categoryModel: mongoose.model("Category", categorySchema),
  categorySchema,
};
