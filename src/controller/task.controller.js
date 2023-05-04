const taskService = require("../service/task.service");
const errorTypes = require("../constants/error-types");

class taskController {
  async create(ctx, next) {
    const task = ctx.request.body;
    const res = await taskService.create(task);
    if (res) {
      ctx.body = {
        code: 200,
        msg: "添加任务成功",
      };
    } else {
      ctx.app.emit("error", "添加任务失败", ctx);
    }
  }

  async getTaskById(ctx, next) {
    const { id } = ctx.query;
    const res = await taskService.getTaskById(id);
    if (res) {
      ctx.body = {
        code: 200,
        data: res,
        msg: "查询任务成功",
      };
    } else {
      ctx.app.emit("error", "任务不存在", ctx);
    }
  }

  async getTaskList(ctx, next) {
    const params = ctx.query;
    const res = await taskService.getTaskList(params);
    const total = await taskService.getTaskCount();
    if (res) {
      ctx.body = {
        code: 200,
        data: {
          items: res,
          total: total,
        },
        msg: "查询任务列表成功",
      };
    } else {
      ctx.app.emit("error", "查询任务列表失败", ctx);
    }
  }
}

module.exports = new taskController();
