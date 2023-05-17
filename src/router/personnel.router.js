const Router = require("koa-router");

const personnelController = require("../controller/personnel.controller");
const { modifyData } = require("../middleware/personnel.middleware");

const personnelRouter = new Router({ prefix: "/personnel" });
personnelRouter.get("/", personnelController.getPersonnelById);
personnelRouter.get("/list", personnelController.getPersonnelList);

personnelRouter.post("/add", personnelController.create);
personnelRouter.post("/update", personnelController.update);
personnelRouter.post("/delete", personnelController.delete);
personnelRouter.post("/batchDelete", personnelController.batchDelete);
personnelRouter.post("/import", modifyData, personnelController.import);

module.exports = personnelRouter;
