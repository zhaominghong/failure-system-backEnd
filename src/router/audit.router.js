const Router = require("koa-router");

const auditController = require("../controller/audit.controller");

const auditRouter = new Router({ prefix: "/audit" });
auditRouter.get("/", auditController.getAuditById);
auditRouter.get("/list", auditController.getAuditList);
auditRouter.get("/record/list", auditController.getRecordList);

auditRouter.post("/add", auditController.create);

module.exports = auditRouter;
