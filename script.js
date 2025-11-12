document.addEventListener("DOMContentLoaded", () => {
  // ========== CART ==========
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartUI();

  window.addToCart = function (plan, price, quantity = 1) {
    const q = Number(quantity) || 1;
    const p = Number(price) || 0;

    // Check if item already exists in cart
    const existing = cart.find(item => item.plan === plan);
    if (existing) {
      existing.quantity += q;
    } else {
      cart.push({ plan, price: p, quantity: q });
    }

    saveAndUpdateCart();
    alert(`Added ${plan} x${q} to cart.`);
  };

  function saveAndUpdateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }

  function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement("li");
      const qty = Number(item.quantity) || 1;
      const lineTotal = (Number(item.price) || 0) * qty;
      li.textContent = `${item.plan} - $${Number(item.price).toFixed(2)} x ${qty} = $${lineTotal.toFixed(2)}`;
      cartItems.appendChild(li);
      total += lineTotal;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  // ========== LOGIN ==========
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = loginForm.querySelector('[name="username"]').value.trim();
      const password = loginForm.querySelector('[name="password"]').value;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        alert("Login successful!");
        window.location.href = "menu.html"; // Redirect to menu
      } else {
        alert("Invalid username or password.");
      }
    });
  }

  // ========== REGISTER ==========
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = registerForm.querySelector('[name="username"]').value.trim();
      const password = registerForm.querySelector('[name="password"]').value;

      if (!username || !password) {
        alert("Please provide both username and password.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some(u => u.username === username)) {
        alert("That username is already taken — choose another.");
        return;
      }

      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! You can now login.");
      registerForm.reset();
    });
  }

  // ========== CHECKOUT ==========
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = checkoutForm.querySelector('[name="email"]').value.trim();
      const name = checkoutForm.querySelector('[name="cardholder"]').value.trim();
      const cardNumber = checkoutForm.querySelector('[name="cardnumber"]').value.trim();
      const expiry = checkoutForm.querySelector('[name="expiry"]').value.trim();
      const cvc = checkoutForm.querySelector('[name="cvc"]').value.trim();

      if (!email || !name || !cardNumber || !expiry || !cvc) {
        alert("Please fill out all fields.");
        return;
      }

      const order = {
        username: name,
        email: email,
        card: { cardNumber, expiry, cvc },
        cart: cart
      };

      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      alert("Checkout successful!");
      cart = [];
      localStorage.removeItem("cart");
      updateCartUI();
      checkoutForm.reset();
    });
  }

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Message sent!');
      contactForm.reset();
    });
  }

  // ========== PASSWORD STRENGTH ==========
  const passwordInput = document.querySelector('#register-form [name="password"]');
  const meter = document.querySelector('.password-strength-meter .meter');

  passwordInput?.addEventListener('input', () => {
    const val = passwordInput.value;
    let strength = 0;
    if (val.length > 5) strength += 30;
    if (/[A-Z]/.test(val)) strength += 30;
    if (/[0-9]/.test(val)) strength += 20;
    if (/[^A-Za-z0-9]/.test(val)) strength += 20;
    meter.style.width = strength + '%';
  });

  // ========== AUTH FORM ANIMATION ==========
  document.querySelectorAll('.auth-form-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      document.querySelector(btn.dataset.target).classList.add('active');
    });
  });
});
