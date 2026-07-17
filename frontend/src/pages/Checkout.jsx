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
    <div className="checkout">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} />

        <input name="phone" placeholder="Phone" onChange={handleChange} />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <h2>Total : ₹ {total}</h2>

        <button className="btn">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
