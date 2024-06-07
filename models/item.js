const mongoose = require("mongoose");
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number, required: true },
    number_in_stock: { type: Number, required: true },
    url: { type: String }
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);