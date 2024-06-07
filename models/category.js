const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String }
});

// Virtual for Formatted Description
CategorySchema.virtual("formattedDescription").get(function() {
    return `${this.name}: ${this.description}`;
});

// Virtual for category's URL
CategorySchema.virtual("standardUrl").get(function() {
    return `/categories/${this._id}`;
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);