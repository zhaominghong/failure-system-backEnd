const errorTypes = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let message;
  switch (error) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      code = 20002; // Bad Request
      message = "用户名或者密码不能为空~";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      code = 20003; // conflict
      message = "用户名已存在~";
      break;
    default:
      code = 20000;
      message = error;
  }

  ctx.body = {
    code: code,
    message: message,
  };
};

module.exports = errorHandler;
