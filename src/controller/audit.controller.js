const auditService = require("../service/audit.service");
const errorTypes = require("../constants/error-types");

class auditController {
    async create(ctx, next) {
        const audit = ctx.request.body;
        const res = await auditService.create(audit);
        if (res) {
            ctx.body = {
                code: 200,
                data: res,
                msg: "添加审核记录成功",
            };
        } else {
            ctx.app.emit("error", "添加审核记录失败", ctx);
        }
    }

    async getAuditById(ctx, next) {
        const { id } = ctx.query;
        const res = await auditService.getAuditById(id);
        if (res) {
            ctx.body = {
                code: 200,
                data: res,
                msg: "查询审核记录成功",
            };
        } else {
            ctx.app.emit("error", "审核记录不存在", ctx);
        }
    }

    async getAuditList(ctx, next) {
        const params = ctx.query;
        const res = await auditService.getAuditList(params);
        const total = await auditService.getAuditCount();
        if (res) {
            ctx.body = {
                code: 200,
                data: {
                    items: res,
                    total: total,
                },
                msg: "查询待审核事件列表成功",
            };
        } else {
            ctx.app.emit("error", "查询待审核事件列表失败", ctx);
        }
    }

    async getRecordList(ctx, next) {
        const params = ctx.query;
        const res = await auditService.getRecordList(params);
        const total = await auditService.getRecordCount();
        if (res) {
            ctx.body = {
                code: 200,
                data: {
                    items: res,
                    total: total,
                },
                msg: "查询审核记录列表成功",
            };
        } else {
            ctx.app.emit("error", "查询审核记录列表失败", ctx);
        }
    }
}
module.exports = new auditController();
