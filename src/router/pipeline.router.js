const Router = require("koa-router");

const pipelineController = require("../controller/pipeline.controller");

const pipelineRouter = new Router({ prefix: "/pipeline" });
pipelineRouter.get("/", pipelineController.getPipelineById);
pipelineRouter.get("/list", pipelineController.getPipelineList);

pipelineRouter.post("/add", pipelineController.create);

module.exports = pipelineRouter;
