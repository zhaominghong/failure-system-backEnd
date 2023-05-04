const Router = require("koa-router");

const eventController = require("../controller/event.controller");

const eventRouter = new Router({ prefix: "/event" });
eventRouter.get("/", eventController.getEventById);
eventRouter.get("/list", eventController.getEventList);

eventRouter.post("/add", eventController.create);
eventRouter.post("/delete", eventController.delete);
eventRouter.post("/batchDelete", eventController.batchDelete);

module.exports = eventRouter;
