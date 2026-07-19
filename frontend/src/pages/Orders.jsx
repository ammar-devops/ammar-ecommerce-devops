import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div className="card" key={order.id}>
            <h3>Order #{order.id}</h3>
            <p>{order.customer_name}</p>
            <p>₹ {order.total}</p>
            <p>{order.created_at}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
