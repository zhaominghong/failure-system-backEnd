const parseXlsxData = require("../utils/xlsxToJSON");
const saveFile = require("../utils/saveFile");

const modifyData = async (ctx, next) => {
  const files = ctx.request.files;
  const fileName = saveFile(files.file, "/public/personnelImportFile/");
  const levelMap = {
    一般: 1,
    重要: 2,
    紧急: 3
    };
    const statusMap = {
        已完成:0,
        待指派:1,
        执行中:2,
        已暂停:3
    }
  let data = await parseXlsxData(fileName);
  data.shift(0, 1);
  data.forEach((item) => {
    item[2] = levelMap[item[2]];
    item[4] = statusMap[item[4]];
  });
  ctx.data = data;
  await next();
};

module.exports = {
  modifyData,
};
