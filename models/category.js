const mongoose = require("mongoose");
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String }
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);