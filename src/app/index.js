const path = require("path");

const Koa = require("koa");
const { koaBody } = require("koa-body");
const cors = require("@koa/cors");
const static = require("koa-static");

const auditRouter = require("../router/audit.router");
const eventRouter = require("../router/event.router");
const personnelRouter = require("../router/personnel.router");
const taskRouter = require("../router/task.router");
const userRouter = require("../router/user.router");
const pipelineRouter = require("../router/pipeline.router");

const errorHandler = require("./error-handler");
const verifyToken = require("../utils/verifyToken");

const app = new Koa();

app.use(koaBody({ multipart: true }));
app.use(cors());
app.use(verifyToken);

app.use(static(path.join(__dirname, "../../public/")));

app.use(auditRouter.routes());
app.use(auditRouter.allowedMethods());

app.use(eventRouter.routes());
app.use(eventRouter.allowedMethods());

app.use(personnelRouter.routes());
app.use(personnelRouter.allowedMethods());

app.use(taskRouter.routes());
app.use(taskRouter.allowedMethods());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(pipelineRouter.routes());
app.use(pipelineRouter.allowedMethods());

app.on("error", errorHandler);
module.exports = app;
