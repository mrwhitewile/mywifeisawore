document.getElementById("ccForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  // Generate fake credit card info
  const ccNumber = generateFakeCC();
  const ccExpiry = generateFakeExpiry();
  const ccCVC = generateFakeCVC();
  const ccName = generateFakeName();

  // Display the fake credit card info
  alert(`Your Credit Card Info:\n\nCard Number: ${ccNumber}\nExpiry: ${ccExpiry}\nCVC: ${ccCVC}\nName: ${ccName}`);

  // Simulate sending an email
  simulateEmail(email, ccNumber, ccExpiry, ccCVC, ccName);
});

function generateFakeCC() {
  const prefixes = [
    "453201", "453202", "453203", "453204", "453205",
    "453206", "453207", "453208", "453209", "453210"
  ];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, "0");
  return prefix + suffix;
}

function generateFakeExpiry() {
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const month = months[Math.floor(Math.random() * months.length)];
  const year = (2024 + Math.floor(Math.random() * 5)).toString().slice(-2);
  return `${month}/${year}`;
}

function generateFakeCVC() {
  return Math.floor(100 + Math.random() * 900).toString().padStart(3, "0");
}

function generateFakeName() {
  const names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis"];
  return names[Math.floor(Math.random() * names.length)];
}

function simulateEmail(email, ccNumber, expiry, cvc, name) {
  console.log(`Sending credit card to ${email}...`);
  console.log(`Card Number: ${ccNumber}`);
  console.log(`Expiry: ${expiry}`);
  console.log(`CVC: ${cvc}`);
  console.log(`Name: ${name}`);
  alert("Email sent with credit card info!")
}
// Login functionality
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    alert("Login successful!");
    // Redirect to buy.html or home
    window. location.href = "buy.html";
  } else {
    alert("Invalid username or password.");
  }
});

// Register functionality
document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username, password });

  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! You can now login.");
});
  // Load cart from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(plan, price, quantity) {
  cart.push({ plan, price, quantity });
  updateCart();
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.plan} - $${item.price} x ${item.quantity}`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty! Add items to proceed.");
    return;
  }

  // Redirect to Stripe Checkout
  window.location.href = "https://checkout.stripe.com/c/pay/your-stripe-checkout-session-id";
}



