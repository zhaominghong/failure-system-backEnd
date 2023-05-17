const errorTypes = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let msg;
  switch (error) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      code = 20002; // Bad Request
      msg = "用户名或者密码不能为空~";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      code = 20003; // conflict
      msg = "用户名已存在~";
      break;
    default:
      code = 20000;
      msg = error;
  }

  ctx.body = {
    code: code,
    msg: msg,
  };
};

module.exports = errorHandler;
