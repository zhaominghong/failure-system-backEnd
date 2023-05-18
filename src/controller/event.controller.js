const eventService = require("../service/event.service");
const errorTypes = require("../constants/error-types");

class eventController {
  async create(ctx, next) {
    const event = ctx.request.body;
    const res = await eventService.create(event);
    if (res) {
      ctx.body = {
        code: 200,
        data: res,
        msg: "添加事件成功",
      };
    } else {
      ctx.app.emit("error", "添加事件失败", ctx);
    }
  }

  async getEventById(ctx, next) {
    const { id } = ctx.query;
    const res = await eventService.getEventById(id);
    if (res) {
      ctx.body = {
        code: 200,
        data: res,
        msg: "查询事件成功",
      };
    } else {
      ctx.app.emit("error", "事件不存在", ctx);
    }
  }

  async getEventList(ctx, next) {
    const params = ctx.query;
    const res = await eventService.getEventList(params);
    const total = await eventService.getEventCount();
    if (res) {
      ctx.body = {
        code: 200,
        data: {
          items: res,
          total: total,
        },
        msg: "查询事件列表成功",
      };
    } else {
      ctx.app.emit("error", "查询事件列表失败", ctx);
    }
  }
  async delete(ctx, next) {
    const { id } = ctx.request.body;
    const res = await eventService.delete(id);
    if (res) {
      ctx.body = {
        code: 200,
        msg: "删除事件成功",
      };
    } else {
      ctx.app.emit("error", "删除事件失败", ctx);
    }
  }
  async batchDelete(ctx, next) {
    const { ids } = ctx.request.body;
    const res = await eventService.batchDelete(ids);
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
    const data = ctx.data;
    const res = await eventService.batchCreate(data);
    if (res) {
      ctx.body = {
        code: 200,
        msg: "批量导入成功",
      };
    } else {
      ctx.app.emit("error", "批量导入失败", ctx);
    }
  }
}

module.exports = new eventController();
