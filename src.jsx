import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [health, setHealth] = useState("Checking...");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const healthRes = await fetch("/api/health");
        const healthData = await healthRes.json();
        setHealth(healthData.status);

        const productRes = await fetch("/api/products");
        const productData = await productRes.json();
        setProducts(productData.products || []);
      } catch (err) {
        setError(err.message);
        setHealth("Offline");
      }
    }

    loadData();
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>NovaCart</h1>

      <h3>Backend: {health}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Products</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((p, i) => (
            <li key={i}>{p.name || p.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
