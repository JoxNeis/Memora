class StorageService {
  static saveFileToSession(fileName, file, allowedFormat = "json") {
    if (!(file instanceof File)) {
      throw new Error("Invalid file input");
    }
    const extension = file.name.split(".").pop().toLowerCase();
    if (extension !== allowedFormat.toLowerCase()) {
      throw new Error(`Only .${allowedFormat} files are allowed`);
    }
    const reader = new FileReader();
    reader.onload = () => {
      sessionStorage.setItem(fileName, reader.result);
    };
    reader.readAsText(file);
  }
  static loadFileFromSession(fileName) {
    return sessionStorage.getItem(fileName);
  }
}
export default StorageService;
