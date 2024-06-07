const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number, required: true },
    number_in_stock: { type: Number, required: true },
    url: { type: String }
});

// Virtual for Full Description
ItemSchema.virtual("fullDescription").get(function() {
    return `${this.name} - ${this.description}, Priced at: $${this.price}`;
});

// Virtual for Availability 
ItemSchema.virtual("isAvailable").get(function() {
    return this.number_in_stock > 0 ? "In Stock" : "Out of Stock";
});

// Virtual for Formatted Price
ItemSchema.virtual("formattedPrice").get(function() {
    return `$${this.price.toFixed(2)}`;
});

// Virtual for a URL Path
ItemSchema.virtual("standardUrl").get(function() {
    return this.url ? this.url : `/items/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);