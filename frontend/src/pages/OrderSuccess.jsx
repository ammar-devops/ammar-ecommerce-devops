import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>🎉 Order Placed Successfully</h1>

      <p>Thank you for shopping with us.</p>

      <Link to="/products">
        <button className="btn">Continue Shopping</button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
