/* -------------------------------------------------
   index.js  –  login / registration front-end logic
   ------------------------------------------------- */

/* ---------- util helper ---------- */
const messageDiv = document.getElementById('message');

/** Show a feedback line under the form */
function showMessage(text, isError = false) {
  messageDiv.textContent = text;
  messageDiv.className =
    `mt-4 text-center text-sm message ${
      isError ? 'text-red-500' : 'text-green-600'
    }`;
}

/* ---------- cached DOM handles ---------- */
const emailInput   = document.getElementById('email');
const passInput    = document.getElementById('password');
const roleSelect   = document.getElementById('role');
const registerBtn  = document.getElementById('registerBtn');

/* ---------- REGISTER ---------- */
registerBtn.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  const pass  = passInput.value.trim();
  const role  = roleSelect.value;

  if (!email || !pass) {
    showMessage('Please fill in all fields', true);
    return;
  }

  try {
    const res = await fetch('/api/register', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ email, password: pass, role })
    });
    const data = await res.json();

    if (res.ok) {
      showMessage('✅ Registration successful. You can now log in.');
    } else {
      showMessage(data.message || 'Registration failed', true);
    }
  } catch (err) {
    console.error(err);
    showMessage('Server error', true);
  }
});

/* ----------- LOGIN ------------ */
document.getElementById('authForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const pass  = passInput.value.trim();
  const role  = roleSelect.value;

  if (!email || !pass) {
    showMessage('Please fill in all fields', true);
    return;
  }

  try {
    const res = await fetch('/api/login', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ email, password: pass, role })
    });
    const data = await res.json();

    if (res.ok) {
      showMessage('✅ Login successful.');
      localStorage.setItem('user', JSON.stringify({ email: data.email, role: data.role }));
      window.location.href = role === 'passenger' ? 'passenger.html' : 'driver.html';
    } else {
      showMessage(data.message || 'Invalid credentials', true);
    }
  } catch (err) {
    console.error(err);
    showMessage('Server error', true);
  }
});
