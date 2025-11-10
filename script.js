document.getElementById("ccForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  // Generate fake credit card info
  const ccNumber = generateFakeCC();
  const ccExpiry = generateFakeExpiry();
  const ccCVC = generateFakeCVC();
  const ccName = generateFakeName();

  // Display the fake credit card info
  alert(`Your Fake Credit Card Info:\n\nCard Number: ${ccNumber}\nExpiry: ${ccExpiry}\nCVC: ${ccCVC}\nName: ${ccName}`);

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
  console.log(`Sending fake credit card to ${email}...`);
  console.log(`Card Number: ${ccNumber}`);
  console.log(`Expiry: ${expiry}`);
  console.log(`CVC: ${cvc}`);
  console.log(`Name: ${name}`);
  alert("Email sent with fake credit card info!");
}