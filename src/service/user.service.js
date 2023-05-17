const path = require("path");

const connection = require("../app/database");
const config = require("../app/config");

class UserService {
  async create(user) {
    const { username, password, role } = user;
    const avatar = path.join(
      "http://localhost:",
      config.APP_PORT,
      "/avatar/defaultAvatar.jpg"
    );
    const statement =
      "INSERT INTO user (USERNAME, PASSWORD, ROLE, AVATAR) VALUES(?, ?, ?, ?)";
    let error;
    const result = await connection
      .execute(statement, [username, password, role, avatar])
      .catch((err) => {
        console.log(err);
        error = err;
      });
    // 对数据库进行操作
    return error;
  }

  async getUserByName(username) {
    const statement = "SELECT * FROM user WHERE USERNAME = ?";
    const result = await connection
      .execute(statement, [username])
      .catch((err) => {
        console.log(err);
      });

    return result[0];
  }
  async updateInfo(username, info) {
    const { email, phone } = info;
    const statement =
      "UPDATE user SET email=?, phone=? WHERE username=?;";
    let error;
    const result = await connection
      .execute(statement, [email, phone, username])
      .catch((err) => {
        console.log(err);
        error = err;
      });
    return error;
  }
  async upload(username, avatar) {
    const statement = "UPDATE user SET avatar=? WHERE username=?;";
    let error;
    const result = await connection
      .execute(statement, [avatar, username])
      .catch((err) => {
        console.log(err);
        error = err;
      });
    return error;
  }
}

module.exports = new UserService();
