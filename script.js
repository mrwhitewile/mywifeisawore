// script.js — Safe, fixed version for a school demo project

document.addEventListener("DOMContentLoaded", () => {
  // ========== Demo "card" form ==========
  const ccForm = document.getElementById("ccForm");
  if (ccForm) {
    ccForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = ccForm.querySelector('[name="email"]').value.trim();
      if (!email) {
        alert("Please enter an email to receive the demo card info.");
        return;
      }

      // Generate safe demo card token (clearly fake — for school demo only)
      const card = generateDemoCard();

      // Show demo info (not real credit card information)
      alert(
        `Demo Card Info (for display only):\n\nCard Token: ${card.token}\nCard Name: ${card.name}\nExpiry: ${card.expiry}\nCVC: ${card.cvc}`
      );

      // Simulate a safe "email" (console only) and save a demo "sent" record
      simulateDemoEmail(email, card);
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
        // Redirect to buy.html or home (change URL to your real page)
        window.location.href = "buy.html";
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

    if (!confirm(`Order summary:\n\n${summary}\n\nTotal: $${total.toFixed(2)}\n\nProceed with demo checkout?`)) {
      return;
    }

    // Simulate payment success and save order to localStorage as a demo
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      total: Number(total.toFixed(2)),
      date: new Date().toISOString(),
      status: "paid (demo)"
    };
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    cart = [];
    saveAndUpdateCart();

    alert("Demo checkout complete! Order saved to localStorage (key: 'orders').");
    // Optionally redirect to an order confirmation page:
    // window.location.href = "order-confirmation.html";
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

  // ========== Demo card generator & email simulation (safe) ==========
  function generateDemoCard() {
    // Generate a clearly fake-demo token and data (NOT a real credit card)
    function randHex(len) {
      let s = "";
      for (let i = 0; i < len; i++) {
        s += Math.floor(Math.random() * 16).toString(16).toUpperCase();
      }
      return s;
    }

    const token = `DEMO-${randHex(4)}-${randHex(4)}-${randHex(4)}`;
    const names = ["Demo User", "Sample Account", "Test Buyer", "Student Card"];
    const name = names[Math.floor(Math.random() * names.length)];
    const expiryMonth = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
    const expiryYear = String(new Date().getFullYear() + 1 + Math.floor(Math.random() * 4)).slice(-2);
    const expiry = `${expiryMonth}/${expiryYear}`;
    const cvc = Math.floor(100 + Math.random() * 900).toString();

    return { token, name, expiry, cvc };
  }

  function simulateDemoEmail(email, card) {
    // DON'T send real sensitive information in a school demo.
    // We log to console and store a demo "sentEmails" record in localStorage for demonstration.
    console.log(`(Demo) Sending card token to: ${email}`);
    console.log(`(Demo) token: ${card.token} | name: ${card.name} | expiry: ${card.expiry} | cvc: ${card.cvc}`);
    const sent = JSON.parse(localStorage.getItem("sentEmails")) || [];
    sent.push({
      to: email,
      cardToken: card.token,
      date: new Date().toISOString()
    });
    localStorage.setItem("sentEmails", JSON.stringify(sent));
  }
});
