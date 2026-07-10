import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [health, setHealth] = useState('checking...');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        setHealth(data.status || 'ok');
      } catch (err) {
        setError(err.message || 'failed to connect');
        setHealth('offline');
      }
    }

    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message || 'failed to load products');
      }
    }

    fetchHealth();
    fetchProducts();
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', margin: '2rem' }}>
      <h1>NovaCart React</h1>
      <p>Backend health: <strong>{health}</strong></p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <section>
        <h2>Products</h2>
        {products.length === 0 ? (
          <p>No products available yet.</p>
        ) : (
          <ul>{products.map((item, index) => <li key={index}>{item.name || item.title || 'Unnamed product'}</li>)}</ul>
        )}
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
