// ===== Booking form submission =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const submitBtn = document.getElementById("bookingSubmitBtn");
  const statusMsg = document.getElementById("bookingStatusMsg");

  if (!form) return;

  // Prevent picking a date in the past
  const dateInput = document.getElementById("preferredDate");
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      customerName: document.getElementById("customerName").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      deviceModel: document.getElementById("deviceModel").value.trim(),
      issueDescription: document.getElementById("issueDescription").value.trim(),
      preferredDate: document.getElementById("preferredDate").value,
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    statusMsg.textContent = "";
    statusMsg.className = "booking-status-msg";

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show validation errors if present, else the general message
        const errText =
          data.errors && data.errors.length
            ? data.errors.map((er) => er.msg).join(", ")
            : data.message || "Something went wrong. Please try again.";
        throw new Error(errText);
      }

      statusMsg.textContent = data.message || "Request submitted! We'll contact you soon.";
      statusMsg.classList.add("success");
      form.reset();
    } catch (err) {
      statusMsg.textContent = err.message || "Could not submit. Please check your connection and try again.";
      statusMsg.classList.add("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Request";
    }
  });
});
