const form = document.getElementById("mailForm");
const statusBox = document.getElementById("status");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  statusBox.hidden = false;
  statusBox.textContent = "Sending...";
  sendBtn.disabled = true;

  try {
    const formData = new FormData(form);

    const response = await fetch("/api/send", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Unable to send email.");
    }

    statusBox.textContent =
      "✓ Test email sent successfully.";

    form.reset();

  } catch (error) {

    statusBox.textContent =
      "✕ " + (error.message || "Send failed.");

  } finally {

    sendBtn.disabled = false;

  }
});
