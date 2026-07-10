// ===================================================
// E-Commerce Global script
// ===================================================

const API_URI = "http://localhost:5000/api";

// ===================================================
// Login
// ===================================================

async function login(email, password) {
  const res = await fetch(`${API_URI}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.token) localStorage.setItem('token', data.token);
  return data;
}

    //===================================================
    // Register
    //===================================================

async function register(user) {
  const res = await fetch(`${API_URI}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return await res.json();
}

    //===================================================
    // Get products
    //===================================================

async function getProducts() {
  const res = await fetch(`${API_URI}/products`);
  return await res.json();
}

    //===================================================
    // Add to cart
    //===================================================

async function addToCart(productId, quantity) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URI}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ productId, quantity })
  });
  return await res.json();
}

      
  