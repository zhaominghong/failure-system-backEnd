const personnelService = require("../service/personnel.service");
const errorTypes = require("../constants/error-types");
const parseXlsxData = require('../utils/xlsxToJSON')
const saveFile = require("../utils/saveFile");


class personnelController {
  async create(ctx, next) {
    const personnel = ctx.request.body;
    const res = await personnelService.create(personnel);
    if (res) {
      ctx.body = {
        code: 200,
        msg: "添加人员成功",
      };
    } else {
      ctx.app.emit("error", "添加人员失败", ctx);
    }
  }

  async getPersonnelById(ctx, next) {
    const { id } = ctx.query;
    const res = await personnelService.getPersonnelById(id);
    if (res) {
      ctx.body = {
        code: 200,
        data: res,
        msg: "查询人员成功",
      };
    } else {
      ctx.app.emit("error", "人员不存在", ctx);
    }
  }

  async getPersonnelList(ctx, next) {
    const params = ctx.query;
    const res = await personnelService.getPersonnelList(params);
    const total = await personnelService.getPersonnelCount();

    if (res) {
      ctx.body = {
        code: 200,
        data: {
          items: res,
          total: total,
        },
        msg: "查询人员列表成功",
      };
    } else {
      ctx.app.emit("error", "查询人员列表失败", ctx);
    }
  }
  async delete(ctx, next) {
    const { id } = ctx.request.body;
    const res = await personnelService.delete(id);
    if (res) {
      ctx.body = {
        code: 200,
        msg: "删除人员成功",
      };
    } else {
      ctx.app.emit("error", "删除人员失败", ctx);
    }
  }
  async batchDelete(ctx, next) {
    const { ids } = ctx.request.body;
    const res = await personnelService.batchDelete(ids);
    if (res) {
      ctx.body = {
        code: 200,
        msg: "批量删除成功",
      };
    } else {
      ctx.app.emit("error", "批量删除失败", ctx);
    }
  }
  async import(ctx, next) {
    const files = ctx.request.files
    const fileName = saveFile(files.file, '/public/personnelImportFile/')
    parseXlsxData(fileName).then(data => {
      console.log(data)
    })
  }
}

module.exports = new personnelController();
