import { useState, useEffect } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                <b>{item.title}</b> — {item.qty} × {item.price} EGP
                <button
                  onClick={() => handleRemove(item.id)}
                  style={{ marginLeft: "10px", background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h4>Total: {total} EGP</h4>
        </>
      )}
    </div>
  );
}

export default Cart;
