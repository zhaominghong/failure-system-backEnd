const fs = require("fs");
const path = require("path");

const saveAvatar = (file) => {
  const reader = fs.createReadStream(file.filepath); //读取文件，返回文件流
  const arr = file.originalFilename.split(".");
  const newAvatarName = `${new Date().getTime()}${file.newFilename}.${
    arr[arr.length - 1]
  }`;
  let filePath = path.join(__dirname, "../../public/avatar/") + newAvatarName; //创建文件的存储路径，并对文件进行重命名

  const upStream = fs.createWriteStream(filePath); // 创建可写流，传入路径
  reader.pipe(upStream);
  upStream.on("error", (err) => {
    console.log("error", err);
  });
  return newAvatarName;
};

module.exports = saveAvatar;
