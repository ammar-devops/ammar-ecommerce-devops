const pool = require("../config/db");

// GET ALL ORDERS
const getOrders = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY id DESC");

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// GET ORDER BY ID
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await pool.query("SELECT * FROM orders WHERE id=$1", [id]);

    if (order.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const items = await pool.query(
      "SELECT * FROM order_items WHERE order_id=$1",
      [id],
    );

    res.json({
      order: order.rows[0],
      items: items.rows,
    });
  } catch (err) {
    next(err);
  }
};

// CREATE ORDER
const createOrder = async (req, res, next) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { customer_name, phone, address, total, items } = req.body;

    const order = await client.query(
      `INSERT INTO orders
      (customer_name,phone,address,total)
      VALUES($1,$2,$3,$4)
      RETURNING *`,
      [customer_name, phone, address, total],
    );

    const orderId = order.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items
        (order_id,product_id,product_name,price,quantity)
        VALUES($1,$2,$3,$4,$5)`,
        [orderId, item.id, item.name, item.price, item.qty],
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
    });
  } catch (err) {
    await client.query("ROLLBACK");

    next(err);
  } finally {
    client.release();
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
};
