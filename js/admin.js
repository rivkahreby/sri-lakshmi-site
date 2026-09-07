const TOKEN_KEY = "slm_admin_token";
const NAME_KEY = "slm_admin_name";
const loginView = document.getElementById("loginView");
const dashboardView = document.getElementById("dashboardView");
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const loginStatusMsg = document.getElementById("loginStatusMsg");
const logoutBtn = document.getElementById("logoutBtn");
const adminNameEl = document.getElementById("adminName");
const bookingsList = document.getElementById("bookingsList");
const refreshBtn = document.getElementById("refreshBtn");
const filterBtns = document.querySelectorAll(".filter-btn[data-status]");
let currentFilter = "";

function authHeaders(includeJson) {
  const headers = { Authorization: "Bearer " + localStorage.getItem(TOKEN_KEY) };
  if (includeJson) headers["Content-Type"] = "application/json";
  return headers;
}

function showDashboard() {
  loginView.style.display = "none";
  dashboardView.style.display = "block";
  adminNameEl.textContent = localStorage.getItem(NAME_KEY) || "";
  fetchBookings();
}

function showLogin() {
  dashboardView.style.display = "none";
  loginView.style.display = "flex";
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";
  loginStatusMsg.textContent = "";
  loginStatusMsg.className = "booking-status-msg";
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value,
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(NAME_KEY, data.name);
    loginForm.reset();
    showDashboard();
  } catch (error) {
    loginStatusMsg.textContent = error.message;
    loginStatusMsg.classList.add("error");
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Log In";
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
  showLogin();
});

filterBtns.forEach((button) => button.addEventListener("click", () => {
  filterBtns.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  currentFilter = button.dataset.status;
  fetchBookings();
}));
refreshBtn.addEventListener("click", fetchBookings);

async function fetchBookings() {
  bookingsList.innerHTML = '<p class="admin-subtext">Loading bookings...</p>';
  const url = currentFilter
    ? `${API_BASE_URL}/api/bookings?status=${encodeURIComponent(currentFilter)}`
    : `${API_BASE_URL}/api/bookings`;
  try {
    const response = await fetch(url, { headers: authHeaders(false) });
    if (response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(NAME_KEY);
      showLogin();
      return;
    }
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Could not load bookings");
    renderBookings(data);
  } catch (error) {
    bookingsList.innerHTML = '<p class="admin-subtext">Could not load bookings. Check your connection.</p>';
  }
}

function renderBookings(bookings) {
  if (!bookings.length) {
    bookingsList.innerHTML = '<p class="admin-subtext">No bookings found.</p>';
    return;
  }
  bookingsList.innerHTML = bookings.map((booking) => {
    const date = new Date(booking.preferredDate).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
    const actions = booking.status === "pending"
      ? `<div class="booking-card-actions">
          <button class="action-btn approve" data-id="${booking._id}" data-action="approved">Approve</button>
          <button class="action-btn reject" data-id="${booking._id}" data-action="rejected">Reject</button>
        </div>` : "";
    return `<div class="booking-card">
      <div class="booking-card-top"><h3>${escapeHtml(booking.customerName)}</h3>
      <span class="status-tag ${escapeHtml(booking.status)}">${escapeHtml(booking.status)}</span></div>
      <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(booking.email || "—")}</p>
      <p><strong>Device:</strong> ${escapeHtml(booking.deviceModel)}</p>
      <p><strong>Issue:</strong> ${escapeHtml(booking.issueDescription)}</p>
      <p><strong>Preferred Date:</strong> ${date}</p>${actions}</div>`;
  }).join("");
  bookingsList.querySelectorAll(".action-btn").forEach((button) => {
    button.addEventListener("click", () => updateStatus(button.dataset.id, button.dataset.action, button));
  });
}

async function updateStatus(id, status, button) {
  const card = button.closest(".booking-card");
  card.querySelectorAll(".action-btn").forEach((item) => { item.disabled = true; });
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
      method: "PUT", headers: authHeaders(true), body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Update failed");
    await fetchBookings();
  } catch (error) {
    alert("Could not update booking status. Please try again.");
    card.querySelectorAll(".action-btn").forEach((item) => { item.disabled = false; });
  }
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

if (localStorage.getItem(TOKEN_KEY)) showDashboard();
else showLogin();
