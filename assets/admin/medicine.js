// document.getElementById("addMedicineForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const form = this;
//   const formData = new FormData(form);
//   const messageBox = document.getElementById("addMedicineMessage");

//   fetch("../../controller/medicine_control.php", {
//     method: "POST",
//     body: formData,
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error("HTTP error " + res.status);
//       return res.json();
//     })
//     .then((data) => {
//       messageBox.style.display = "block";
//       if (data.success) {
//         messageBox.className = "message-box message-success";
//         messageBox.textContent = data.message + " (ID: " + data.mid + ")";
//         form.reset();
//       } else {
//         messageBox.className = "message-box message-error";
//         messageBox.textContent = data.message;
//       }
//     })
//     .catch((error) => {
//       messageBox.style.display = "block";
//       messageBox.className = "message-box message-error";
//       messageBox.textContent = "An error occurred while submitting the form.";
//       console.error("Fetch error:", error);
//     });
// });

// document.getElementById("editMedicineForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const form = this;
//   const formData = new FormData(form);
//   const messageBox = document.getElementById("editMedicineMessage");
//   fetch("../../controller/medicine_control.php", {
//     method: "POST",
//     body: formData,
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error("HTTP error " + res.status);
//       return res.json();
//     })
//     .then((data) => {
//       messageBox.style.display = "block";
//       if (data.success) {
//         messageBox.className = "message-box message-success";
//         messageBox.textContent = data.message + (data.mid ? " (ID: " + data.mid + ")" : "");
//         form.reset(); // optional: only if needed for both
//       } else {
//         messageBox.className = "message-box message-error";
//         messageBox.textContent = data.message;
//       }
//     })
//     .catch((error) => {
//       messageBox.style.display = "block";
//       messageBox.className = "message-box message-error";
//       messageBox.textContent = "An error occurred while submitting the form.";
//       console.error("Fetch error:", error);
//     });
// });

function medicine_control() {
  const form = this;
  const formData = new FormData(form);

  const messageBox = form.id === "editMedicineForm" ? document.getElementById("editMedicineMessage") : document.getElementById("addMedicineMessage");

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
        messageBox.textContent = data.message + (data.mid ? " (ID: " + data.mid + ")" : "");
        setTimeout(() => {
          window.location.href = "adminDash.php?section=medicine&action=view";
        }, 1000);
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
}

const editForm = document.getElementById("editMedicineForm");
if (editForm) {
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    medicine_control.call(this);
  });
}
const addForm = document.getElementById("addMedicineForm");
if (addForm) {
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    medicine_control.call(this);
  });
}