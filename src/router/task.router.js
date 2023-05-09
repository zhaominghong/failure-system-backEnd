const Router = require("koa-router");

const taskController = require("../controller/task.controller");

const taskRouter = new Router({ prefix: "/task" });
taskRouter.get("/", taskController.getTaskById);
taskRouter.get("/list", taskController.getTaskList);

taskRouter.post("/add", taskController.create);
taskRouter.post("/delete", taskController.delete);
taskRouter.post("/batchDelete", taskController.batchDelete);

module.exports = taskRouter;
