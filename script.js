document.addEventListener("DOMContentLoaded", () => {
  // ========== Cart ==========
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartUI();

  // Expose addToCart globally
  window.addToCart = function (plan, price, quantity = 1) {
    const q = Number(quantity) || 1;
    const p = Number(price) || 0;
    cart.push({ plan, price: p, quantity: q });
    saveAndUpdateCart();
    alert(`Added ${plan} x${q} to cart.`);
  };

  // Helper: save cart and update UI
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

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      const qty = Number(item.quantity) || 1;
      const lineTotal = (Number(item.price) || 0) * qty;
      li.textContent = `${item.plan} - $${Number(item.price).toFixed(2)} x ${qty} = $${lineTotal.toFixed(2)}`;
      cartItems.appendChild(li);
      total += lineTotal;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  // ========== Login ==========
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = loginForm.querySelector('[name="username"]').value.trim();
      const password = loginForm.querySelector('[name="password"]').value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        alert("Login successful!");
        window.location.href = "menu.html";
      } else {
        alert("Invalid username or password.");
      }
    });
  }

  // ========== Register ==========
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

      if (users.some((u) => u.username === username)) {
        alert("That username is already taken — choose another.");
        return;
      }

      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! You can now login.");
      registerForm.reset();
    });
  }

  // ========== Checkout Form ==========
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

      // Save user data and card info
      const user = {
        username: name,
        email: email,
        card: {
          cardNumber: cardNumber,
          expiry: expiry,
          cv
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  // You can add logic to send the form via email or API here
  alert('Message sent!');
});
