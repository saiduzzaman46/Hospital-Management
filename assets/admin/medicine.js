document.getElementById("addMedicineForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);
  const messageBox = document.getElementById("addMedicineMessage");

  fetch("../../controller/medicine_control.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error " + res.status);
      return res.json();
    })
    .then((data) => {
      messageBox.style.display = "block";
      if (data.success) {
        messageBox.className = "message-box message-success";
        messageBox.textContent = data.message + " (ID: " + data.mid + ")";
        form.reset();
      } else {
        messageBox.className = "message-box message-error";
        messageBox.textContent = data.message;
      }
    })
    .catch((error) => {
      messageBox.style.display = "block";
      messageBox.className = "message-box message-error";
      messageBox.textContent = "An error occurred while submitting the form.";
      console.error("Fetch error:", error);
    });
});
