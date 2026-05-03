class StorageController {
  saveFileToSession(fileName, file) {
    sessionStorage.setItem(fileName, JSON.stringify(file));
  }
  loadFileFromSession(fileName) {
    return sessionStorage.getItem(fileName);
  }
}
export default StorageController