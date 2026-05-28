const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { readDB, writeDB } = require("../helpers/db");

// GET /products — fetch all products
router.get("/", (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.products });
});

// GET /products/:id — fetch a single product
router.get("/:id", (req, res) => {
  const db = readDB();
  const product = db.products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.json({ success: true, data: product });
});

// POST /products — create a new product
router.post("/", (req, res) => {
  const { name, description, price, category, stock, sizes } = req.body;

  if (!name || !price) {
    return res.status(400).json({ success: false, message: "name and price are required" });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description: description || "",
    price: parseFloat(price),
    category: category || "uncategorized",
    stock: stock || 0,
    sizes: sizes || [],
    createdAt: new Date().toISOString(),
  };

  const db = readDB();
  db.products.push(newProduct);
  writeDB(db);

  res.status(201).json({ success: true, data: newProduct });
});

// PUT /products/:id — update a product
router.put("/:id", (req, res) => {
  const db = readDB();
  const index = db.products.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const updatedProduct = {
    ...db.products[index],
    ...req.body,
    id: db.products[index].id,
  };

  db.products[index] = updatedProduct;
  writeDB(db);

  res.json({ success: true, data: updatedProduct });
});

// DELETE /products/:id — delete a product
router.delete("/:id", (req, res) => {
  const db = readDB();
  const index = db.products.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  const deleted = db.products.splice(index, 1)[0];
  writeDB(db);

  res.json({ success: true, message: "Product deleted", data: deleted });
});

module.exports = router;
