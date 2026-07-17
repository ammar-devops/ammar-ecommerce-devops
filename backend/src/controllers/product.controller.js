const pool = require("../config/db");

// GET ALL PRODUCTS
const getProducts = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
};

// GET PRODUCT BY ID
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// CREATE PRODUCT
const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO products (name, price)
       VALUES ($1, $2)
       RETURNING *`,
      [name, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name=$1, price=$2
       WHERE id=$3
       RETURNING *`,
      [name, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};