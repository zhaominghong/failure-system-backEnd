const Router = require("koa-router");

const personnelController = require("../controller/personnel.controller");

const personnelRouter = new Router({ prefix: "/personnel" });
personnelRouter.get("/", personnelController.getPersonnelById);
personnelRouter.get("/list", personnelController.getPersonnelList);

personnelRouter.post("/add", personnelController.create);

module.exports = personnelRouter;
