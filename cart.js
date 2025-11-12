let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(plan, price) {
  const existing = cart.find(item => item.plan === plan);
  if (existing) existing.quantity += 1;
  else cart.push({ plan, price, quantity: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  alert(`${plan} added to cart.`);
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    const lineTotal = item.price * item.quantity;
    li.textContent = `${item.plan} x${item.quantity} = $${lineTotal.toFixed(2)}`;
    cartItems.appendChild(li);
    total += lineTotal;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

updateCartUI();
