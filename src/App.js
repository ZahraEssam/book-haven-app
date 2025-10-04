import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { books } from "./data/books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";


function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const handleAddToCart = (book) => {
    if (!user) {
      setError("⚠️ You must login before adding to cart!");
      return;
    }
    setError("");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === book.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...book, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ Added "${book.title}" to cart!`);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/"> Book Haven</Link>
        <div className="ms-auto">
          <Link className="btn btn-link me-2" to="/about">About</Link>
          <Link className="btn btn-outline-secondary btn-sm me-2" to="/cart">🛒 Cart</Link>
          {user ? (
            <>
              <span className="me-2">Welcome, {user.name}</span> {/* ✅ هنا بقي الاسم */}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-primary btn-sm me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="container my-4">
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <Routes>
          <Route
            path="/"
            element={
              <div className="row">
                {books.map((book) => (
                  <div className="col-md-4 mb-4" key={book.id}>
                    <div className="card h-100 shadow-sm">
                      <img
                        src={book.img}
                        className="card-img-top"
                        alt={book.title}
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{book.title}</h5>
                        <p className="card-text text-muted">{book.author}</p>
                        <p className="fw-bold">{book.price} EGP</p>
                        <button
                          className="btn btn-success mt-auto"
                          onClick={() => handleAddToCart(book)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
