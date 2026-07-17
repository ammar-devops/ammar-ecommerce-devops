require("dotenv").config();

const pool = require("../config/db");

async function initDB() {
  try {
    // ==========================
    // Products Table
    // ==========================
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Products table ready");

    // ==========================
    // Orders Table
    // ==========================
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Orders table ready");

    // ==========================
    // Order Items Table
    // ==========================
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(id) ON DELETE CASCADE,
        product_id INT,
        product_name VARCHAR(255),
        price DECIMAL(10,2),
        quantity INT
      );
    `);

    console.log("✅ Order Items table ready");

    // ==========================
    // Sample Products
    // ==========================
    await pool.query(`
      INSERT INTO products (name, price)
      VALUES
      ('iPhone 16',79999),
      ('MacBook Air M4',119999),
      ('AirPods Pro',24999)
      ON CONFLICT DO NOTHING;
    `);

    console.log("✅ Sample products inserted");

    process.exit(0);
  } catch (err) {
    console.error("❌ Database Init Error:", err);
    process.exit(1);
  }
}

initDB();
