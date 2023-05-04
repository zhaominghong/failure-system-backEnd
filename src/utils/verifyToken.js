const jwt = require("jsonwebtoken");
const config = require("../app/config");

const verifyToken = async (ctx, next) => {
  const url = ctx.request.url.split("?")[0];
  const url_exclude = ["/user/login", "/user/regist", "/avatar"];

  let noVerify = !!url_exclude.some((item) => url.indexOf(item) === 0);

  if (noVerify) {
    // 不检测token
    await next();
  } else {
    // 检测token
    let token = ctx.request.headers["authorization"];
    if (token) {
      let payload = await jwt.verify(
        token,
        config.TOKEN_SECRET,
        async (err, decode) => {
          if (err) {
            if (err.name == "TokenExpiredError") {
              ctx.body = {
                code: 20004,
                msg: "token已过期",
              };
            } else if (err.name == "JsonWebTokenError") {
              ctx.body = {
                code: 20004,
                msg: "无效的token",
              };
            }
            return;
          } else {
            ctx.userinfo = decode;
            await next();
          }
        }
      );
    } else {
      ctx.body = {
        code: 20004,
        msg: "登录信息已过期",
      };
    }
  }
};

module.exports = verifyToken;
