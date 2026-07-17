const API = "http://localhost:5000/api/orders";

export async function createOrder(order) {
  const response = await fetch(API, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(order),
  });

  return response.json();
}
