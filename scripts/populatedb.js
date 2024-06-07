// Require Models and Package
const mongoose = require("mongoose");
const Item = require("../models/item.js");
const Category = require("../models/category.js");

// Script Explanation 
console.log(
    "This script populates categories and items to your database. " +
    "Specify the database as an argument - e.g., node populateDB <db_uri>"
  );

// Connection String
const mongoDB = "mongodb+srv://garrettaudet:kKDeF01Kbjzs05L4@prod-models.vutqmo8.mongodb.net/?retryWrites=true&w=majority&appName=Prod-Models";

// Attempt to Connect
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Create Category
async function categoryCreate(name, description, url) {
    const category = new Category({ name, description, url });
    await category.save();
    console.log(`Added category: ${name}`);
    return category;
}

// Create Item
async function itemCreate(name, description, category, price, number_in_stock, url) {
    const item = new Item({ name, description, category, price, number_in_stock, url });
    await item.save();
    console.log(`Added item: ${name}`);
    return item;
}

// Create Items for Categories
async function createCategoriesItems() {
    let categories = [];
    let items = [];

    console.log("Creating categories...");
    categories.push(await categoryCreate("Electronics", "Devices and gadgets", "/categories/electronics"));
    categories.push(await categoryCreate("Books", "All kinds of books", "/categories/books"));

    console.log("Creating items...");
    items.push(await itemCreate("Laptop", "High-performance gaming laptop", categories[0], 1200, 100, "/items/laptop"));
    items.push(await itemCreate("The Great Gatsby", "Classic Literature Book", categories[1], 15.99, 300, "/items/great-gatsby"));

    // Adding more items can be done similarly by referencing the categories array
}

// Run functions
async function main() {
    await createCategoriesItems();
    mongoose.connection.close();
}

// Error Message if Failure
main().catch(err => console.log("Error populating database: " + err));