const path = require("path");

const Router = require("koa-router");

const UserController = require("../controller/user.controller");
const { verifyUser } = require("../middleware/user.middleware");

const userRouter = new Router({ prefix: "/user" });

userRouter.post("/regist", verifyUser, UserController.create);
userRouter.post("/login", UserController.login);
userRouter.post("/logout", UserController.logout);
userRouter.get("/info", UserController.getInfo);
userRouter.post("/update", UserController.updateInfo);

module.exports = userRouter;
