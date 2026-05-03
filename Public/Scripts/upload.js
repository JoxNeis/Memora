import Quiz from "../../App/Model/Quiz.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  const el = {
    btnDownload: document.getElementById("btn-download-template"),
    uploadZone: document.getElementById("upload-zone"),
    fileInput: document.getElementById("import-file"),
    btnStart: document.getElementById("btn-start"),
    loadedInfo: document.getElementById("loaded-info"),
  };

  el.btnDownload.addEventListener("click", downloadTemplate);
  el.uploadZone.addEventListener("click", () => el.fileInput.click());
  el.fileInput.addEventListener("change", receiveFile);
  el.btnStart.addEventListener("click", startQuiz);

  function downloadTemplate() {
    const link = document.createElement("a");

    link.href = "../../storage/template.json";

    link.download = "memora-quiz-template.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function receiveFile(e) {
    const file = e.target.files[0];

    if (file) {
      handleFile(file);
    }
  }

  function handleFile(file) {
    if (!isJsonFile(file)) {
      showErrorModal("Invalid File Format", "File must be a JSON");

      return;
    }
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(file);
  }

  function handleFileLoad(e) {
    try {
      const json = JSON.parse(e.target.result);
      validateQuiz(json);
      sessionStorage.setItem("current_quiz", JSON.stringify(json));
      enableStart();
    } catch (err) {
      showErrorModal(
        "Invalid JSON Format",
        "Invalid JSON format: " + err.message,
      );
      disableStart();
    }
  }

  function validateQuiz(json) {
    // Ensures Quiz format is valid
    Quiz.fromJSON(json);
  }

  function isJsonFile(file) {
    return file.name.toLowerCase().endsWith(".json");
  }

  function enableStart() {
    el.btnStart.disabled = false;
    if (el.loadedInfo) {
      el.loadedInfo.style.display = "block";
    }
  }

  function disableStart() {
    el.btnStart.disabled = true;
    if (el.loadedInfo) {
      el.loadedInfo.style.display = "none";
    }
  }

  function startQuiz() {
    window.location.href = "quiz.html";
  }
}
