document.addEventListener("DOMContentLoaded", () => {
  // ========== Demo "card" form ==========
  const ccForm = document.getElementById("ccForm");
  if (ccForm) {
    ccForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = ccForm.querySelector('[name="email"]').value.trim();
      const name = ccForm.querySelector('[name="cardholder"]').value.trim();
      const cardNumber = ccForm.querySelector('[name="cardnumber"]').value.trim();
      const expiry = ccForm.querySelector('[name="expiry"]').value.trim();
      const cvc = ccForm.querySelector('[name="cvc"]').value.trim();

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
          cvc: cvc,
          name: name
        }
      };

      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Demo card info saved successfully!");
    });
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

      // Simple uniqueness check
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

  // ========== Cart ==========
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartUI();

  // Expose addToCart globally so buttons in HTML can call addToCart(...)
  window.addToCart = function (plan, price, quantity = 1) {
    // Ensure quantity & price are numbers
    const q = Number(quantity) || 1;
    const p = Number(price) || 0;
    cart.push({ plan, price: p, quantity: q });
    saveAndUpdateCart();
    alert(`Added ${plan} x${q} to cart.`);
  };

  // Checkout function: simulate purchase, save orders, clear cart
  window.checkout = function () {
    if (cart.length === 0) {
      alert("Your cart is empty! Add items to proceed.");
      return;
    }

    // Build order summary
    const total = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const summary = cart.map((it) => `${it.plan} x${it.quantity} — $${(it.price * it.quantity).toFixed(2)}`).join("\n");

    if (!confirm(`Order summary:\n\n${summary}\n\nTotal: $${total.toFixed(2)}\n\nProceed with checkout?`)) {
      return;
    }

    // Simulate payment success and save order to localStorage
    const orders = JSON
