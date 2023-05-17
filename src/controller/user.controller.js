const jwt = require("jsonwebtoken");

const UserService = require("../service/user.service");
const config = require("../app/config");
const saveFile = require("../utils/saveFile");

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;
    // 查询数据
    const result = await UserService.create(user);
    // 返回数据
    if (result) {
      ctx.body = {
        code: 20000,
        msg: "创建用户失败",
        error: result,
      };
    } else {
      ctx.body = {
        code: 200,
        msg: "创建用户成功",
      };
    }
  }
  async login(ctx, next) {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }
    const result = await UserService.getUserByName(username);
    if (result[0].password === password) {
      const payload = {
        username: result[0].username,
        avatar: result[0].avatar,
        email: result[0].email,
        phone: result[0].phone,
        role: result[0].role,
      };
      const token = jwt.sign(payload, config.TOKEN_SECRET, {
        expiresIn: config.TOKEN_EXPIRES,
      });
      ctx.body = {
        code: 200,
        token: token,
        msg: "登录成功",
      };
    } else {
      ctx.body = {
        code: 20000,
        msg: "登录失败",
      };
    }
  }
  async logout(ctx, next) {
    ctx.body = {
      code: 200,
      msg: "注销登录成功",
    };
  }
  async getInfo(ctx, next) {
    const { username } = ctx.userinfo;
    const result = await UserService.getUserByName(username);
    delete result[0].password;
    if (result) {
      ctx.body = {
        code: 200,
        data: {
          userinfo: result[0],
        },
        msg: "用户信息获取成功",
      };
    } else {
      ctx.body = {
        code: 20000,
        msg: "用户信息获取失败",
      };
    }
  }
  async updateInfo(ctx, next) {
    const { username } = ctx.userinfo;
    const info = ctx.request.body;
    const result = await UserService.updateInfo(username, info);
    if (result) {
      ctx.body = {
        code: 20000,
        msg: "用户信息更新失败",
        error: result,
      };
    } else {
      ctx.body = {
        code: 200,
        msg: "用户信息更新成功",
      };
    }
  }
  async upload(ctx, next) {
    const { username } = ctx.userinfo;
    const file = ctx.request.files;

    const avatar = `http://localhost:${config.APP_PORT}/avatar/${saveFile(
      file.avatar,
      "/public/avatar/"
    )}`;
    const result = await UserService.upload(username, avatar);
    if (result) {
      ctx.body = {
        code: 20000,
        msg: "头像更新失败",
        error: result,
      };
    } else {
      ctx.body = {
        code: 200,
        msg: "头像更新成功",
      };
    }
  }
}

module.exports = new UserController();
