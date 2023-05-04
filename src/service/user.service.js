const connection = require("../app/database");

class UserService {
  async create(user) {
    const { username, password, role } = user;
    const statement =
      "INSERT INTO user (USERNAME, PASSWORD, ROLE) VALUES(?, ?, ?)";
    let error;
    const result = await connection
      .execute(statement, [username, password, role])
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
    const { avatar, email, phone, role } = info;
    const statement =
      "UPDATE user SET avatar=?, email=?, phone=?, role=? WHERE username=?;";
    let error;
    const result = await connection
      .execute(statement, [avatar, email, phone, role, username])
      .catch((err) => {
        console.log(err);
        error = err;
      });
    return error;
  }
}

module.exports = new UserService();
