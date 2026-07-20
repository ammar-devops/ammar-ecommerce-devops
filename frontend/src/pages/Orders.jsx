import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const res = await fetch(
        import.meta.env.VITE_ORDERS_API_URL || "/api/orders",
      );

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="orders-page">
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>

          <p>You haven't placed any orders yet.</p>

          <Link to="/products">
            <button className="btn">Start Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <h3>Order #{order.id}</h3>

                <span className="order-status">Completed</span>
              </div>

              <p>
                <strong>Customer</strong>
                <br />
                {order.customer_name}
              </p>

              <p>
                <strong>Total</strong>
                <br />₹ {Number(order.total).toLocaleString()}
              </p>

              <p>
                <strong>Order Date</strong>
                <br />
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
