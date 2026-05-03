async function loadModal() {
  const container = document.getElementById("modal-container");

  const response = await fetch("../Assets/Snippets/modal.html");
  const html = await response.text();

  container.innerHTML = html;

  setupModal();
}

function setupModal() {
  const modal = document.getElementById("simple-modal");
  const closeBtn = document.querySelector(".modal-close");
  const closeButton = document.getElementById("close-modal");

  function closeModal() {
    modal.style.display = "none";
  }

  closeBtn?.addEventListener("click", closeModal);
  closeButton?.addEventListener("click", closeModal);

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
}

function showErrorModal(title, text) {
  const modal = document.getElementById("simple-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");

  modalTitle.textContent = title;
  modalText.textContent = text;

  modal.style.display = "block";
}

document.addEventListener("DOMContentLoaded", loadModal);
