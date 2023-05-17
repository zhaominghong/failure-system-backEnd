const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx")

const saveFile = (file, savePath) => {
  const arr = file.originalFilename.split(".");
  let fileName = ''
  if (arr[arr.length - 1] === 'xlsx') {
    const workbook = XLSX.readFile(file.filepath);
    fileName = `${new Date().getTime()}${file.newFilename}.${arr[arr.length - 1]}`;
    const filePath = path.join(__dirname, '../../', savePath, fileName);
    XLSX.writeFile(workbook, filePath);
  } else {
    const reader = fs.createReadStream(file.filepath); //读取文件，返回文件流
    const arr = file.originalFilename.split(".");
    fileName = `${new Date().getTime()}${file.newFilename}.${
      arr[arr.length - 1]
    }`;
    let filePath = path.join(__dirname,'../../', savePath) + fileName; //创建文件的存储路径，并对文件进行重命名

    const upStream = fs.createWriteStream(filePath); // 创建可写流，传入路径
    reader.pipe(upStream);
    upStream.on("error", (err) => {
      console.log("error", err);
    });
  }
    
  return fileName;
};

module.exports = saveFile;
