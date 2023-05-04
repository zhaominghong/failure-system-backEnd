const pipelineService = require("../service/pipeline.service");
const errorTypes = require("../constants/error-types");

class pipelineController {
  async create(ctx, next) {
    const pipeline = ctx.request.body;
    const res = await pipelineService.create(pipeline);
    if (res) {
      ctx.body = {
        code: 200,
        data: res,
        msg: "添加管道成功",
      };
    } else {
      ctx.app.emit("error", "添加管道失败", ctx);
    }
  }

  async getPipelineById(ctx, next) {
    const { id } = ctx.query;
    const res = await pipelineService.getPipelineById(id);
    if (res) {
      ctx.body = {
        code: 200,
        data: res,
        msg: "查询管道成功",
      };
    } else {
      ctx.app.emit("error", "管道不存在", ctx);
    }
  }

  async getPipelineList(ctx, next) {
    const params = ctx.query;
    const res = await pipelineService.getPipelineList(params);
    const total = await pipelineService.getPipelineCount();
    if (res) {
      ctx.body = {
        code: 200,
        data: {
          items: res,
          total: total,
        },
        msg: "查询管道列表成功",
      };
    } else {
      ctx.app.emit("error", "查询管道列表失败", ctx);
    }
  }
}

module.exports = new pipelineController();
