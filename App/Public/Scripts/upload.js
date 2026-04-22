import Quiz from "../../Model/Quiz.js";

//#region GET ELEMENT
const button_download_template = document.getElementById(
  "btn-download-template",
);
const upload_zone = document.getElementById("upload-zone");
const file_input = document.getElementById("import-file");
const start_button = document.getElementById("btn-start");
//#endregion

//#region EVENT LISTENER
button_download_template.addEventListener("click", () => {
  downloadTemplate();
});
upload_zone.addEventListener("click", () => file_input.click());
file_input.addEventListener("change", (e) => {
  receiveFile(e);
});
start_button.addEventListener("click",(e)=>{
  startQuiz();
})
//#endregion

//#region FUNCTION
function downloadTemplate() {
  const template_json = document.createElement("a");
  template_json.href = "../../storage/template.json";
  template_json.download = "memora-quiz-template.json";
  document.body.appendChild(template_json);
  template_json.click();
  document.body.removeChild(template_json);
}

function receiveFile(e) {
  const file = e.target.files[0];
  if (file) handleFile(file);
}

function handleFile(file) {
  if (!file.name.endsWith(".json")) {
    showErrorModal("Invalid File Format", "File must be a json");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      const quiz = Quiz.fromJSON(json);
      sessionStorage.setItem("current_quiz", JSON.stringify(json));
    } catch (err) {
      showErrorModal(
        "Invalid JSON Format",
        "Invalid JSON format: " + err.message,
      );
      start_button.disabled = true;
      document.getElementById("loaded-info").style.display = "none";
    }
  };
  reader.readAsText(file);
}

function startQuiz(){
  console.log("Start Quiz!");
  window.location.href = "quiz.html";
}
//#endregion
