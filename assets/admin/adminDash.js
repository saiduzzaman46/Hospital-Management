// --- Client-Side JS for interactivity (not for data storage) ---

// Helper function to show messages (similar to your patient dashboard)
function showMessage(elementId, message, type) {
  const msgBox = document.getElementById(elementId);
  msgBox.textContent = message;
  msgBox.className = `message-box message-${type}`;
  msgBox.style.display = "block";
  setTimeout(() => {
    msgBox.style.display = "none";
  }, 3000);
}

// Sidebar and Overlay functionality
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuItems = document.querySelectorAll(".sidebar-menu .menu-item");

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
  menuItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
});

function deleteParient(id) {
  if (confirm("Are you sure you want to delete this patient?")) {
    document.getElementById("deletePatientId").value = id;
    document.getElementById("deletePatientsForm").submit();
  }
}
function deleteDoctor(id) {
  if (confirm("Are you sure you want to delete this doctor?")) {
    document.getElementById("deleteDoctorId").value = id;
    document.getElementById("deleteDoctorForm").submit();
  }
}
function deleteAppointment(id) {
  if (confirm("Are you sure you want to delete this appointment?")) {
    document.getElementById("deleteAppointmentId").value = id;
    document.getElementById("deleteAppointmentForm").submit();
  }
}

function updateAppointmentStatus(appointmentId, newStatus) {
  fetch("../../controller/update_appointment_status.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `id=${appointmentId}&status=${newStatus}`,
  })
    .then((response) => response.text())
    .then((data) => {
      // console.log(data); // Optional: log success or failure
      location.reload(); // Refresh to reflect updated status
    })
    .catch((error) => {
      console.error("Error updating appointment status:", error);
    });
}

function filterAppointments() {
  const doctorId = document.getElementById("searchDoctorId").value.toLowerCase();
  const patientId = document.getElementById("searchPatientId").value.toLowerCase();
  const dateFrom = document.getElementById("dateFrom").value;
  const dateTo = document.getElementById("dateTo").value;
  const status = document.getElementById("statusFilter").value.toLowerCase();

  const rows = document.querySelectorAll("#appointmentTable tbody tr");

  rows.forEach((row) => {
    const columns = row.querySelectorAll("td");
    if (columns.length < 7) return;

    const rowPatientId = columns[1].innerText.toLowerCase();
    const rowDoctorId = columns[2].innerText.toLowerCase();
    const rowDate = columns[6].innerText;
    const rowStatus = columns[5].innerText.toLowerCase();

    let show = true;

    if (doctorId && !rowDoctorId.includes(doctorId)) show = false;
    if (patientId && !rowPatientId.includes(patientId)) show = false;
    if (dateFrom && rowDate < dateFrom) show = false;
    if (dateTo && rowDate > dateTo) show = false;
    if (status && rowStatus !== status) show = false;

    row.style.display = show ? "" : "none";
  });
}
