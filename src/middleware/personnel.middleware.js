const parseXlsxData = require("../utils/xlsxToJSON");
const saveFile = require("../utils/saveFile");

const modifyData = async (ctx, next) => {
  const files = ctx.request.files;
  const fileName = saveFile(files.file, "/public/personnelImportFile/");
  const reoleMap = {
    巡线人员: 1,
    抢险人员: 2,
  };
  let data = await parseXlsxData(fileName);
  data.shift(0, 1);
  data.forEach((item) => {
    item[1] = reoleMap[item[1]];
  });
  ctx.data = data;
  await next();
};

module.exports = {
  modifyData,
};
