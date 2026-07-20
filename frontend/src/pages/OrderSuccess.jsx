import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with <strong>Ammar Shop</strong>.
          <br />
          Your order has been received and is being processed.
        </p>

        <div className="success-buttons">
          <Link to="/products">
            <button className="btn">🛍 Continue Shopping</button>
          </Link>

          <Link to="/orders">
            <button className="btn-outline">📦 View My Orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
