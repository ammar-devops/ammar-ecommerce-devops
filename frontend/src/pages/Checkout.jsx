import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { createOrder } from "../services/orderService";

function Checkout() {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await createOrder({
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        total,
        items: cart,
      });

      alert(response.message);
      navigate("/success");
    } catch (err) {
      console.error(err);
      alert("Unable to place order.");
    }
  }

  return (
    <div className="checkout-page">
      <h1>🧾 Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            name="phone"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={handleChange}
          />

          <label>Delivery Address</label>
          <textarea
            name="address"
            placeholder="Enter complete delivery address"
            value={form.address}
            onChange={handleChange}
          />

          <button type="submit" className="checkout-btn">
            ✅ Place Order
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="summary-row">
            <span>Grand Total</span>
            <strong>₹ {Number(total).toLocaleString()}</strong>
          </div>

          <p className="secure-text">
            🔒 Secure Checkout with protected payment flow.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
