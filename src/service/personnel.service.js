const connection = require("../app/database");

class personnelService {
  async create(personnel) {
    const { name, identity, identityNo, telePhoneNo, email } = personnel;
    const statement =
      "INSERT INTO PERSONNEL (name, identity, identityNo, telePhoneNo, email) VALUES (?, ?, ?, ?, ?);";
    const result = await connection
      .execute(statement, [name, identity, identityNo, telePhoneNo, email])
      .catch((err) => {
        console.log(err);
      });
    return result[0];
  }
  async update(personnel) {
    const { id, name, identity, identityNo, telePhoneNo, email } = personnel;
    const statement =
      "UPDATE PERSONNEL SET name=?, identity=?, identityNo=?, telePhoneNo=?, email=? WHERE id=?;";
    const result = await connection
      .execute(statement, [name, identity, identityNo, telePhoneNo, email, id])
      .catch((err) => {
        console.log(err);
      });
    return result[0];
  }

  async getPersonnelById(id) {
    const statement = "SELECT * FROM PERSONNEL WHERE ID = ?";
    const result = await connection.execute(statement, [id]).catch((err) => {
      console.log(err);
    });
    return result[0][0];
  }

  async getPersonnelList(params) {
    const { limit, start } = params;
    if (limit !== undefined && start !== undefined) {
      const statement = "SELECT * FROM PERSONNEL LIMIT ? , ?";
      const result = await connection
        .execute(statement, [start, limit])
        .catch((err) => {
          console.log(err);
        });
      return result[0];
    } else {
      const statement = "SELECT * FROM PERSONNEL";
      const result = await connection.execute(statement).catch((err) => {
        console.log(err);
      });
      return result[0];
    }
  }
  async getPersonnelCount() {
    const statement = "SELECT COUNT(*) FROM PERSONNEL";
    const result = await connection.execute(statement).catch((err) => {
      console.log(err);
    });
    return result[0][0]["COUNT(*)"];
  }
  async delete(id) {
    const statement = "DELETE FROM PERSONNEL WHERE id = ?;";
    const result = await connection.execute(statement, [id]).catch((err) => {
      console.log(err);
    });
    return result[0];
  }

  async batchDelete(ids) {
    const statement = `DELETE FROM PERSONNEL WHERE id IN (${ids.join(",")})`;
    const result = await connection.execute(statement).catch((err) => {
      console.log(err);
    });
    return result[0];
  }

  async batchCreate(personnelList) {
    let statement =
      "INSERT INTO PERSONNEL (name, identity, identityNo, telePhoneNo, email) VALUES ";
    let arr = [];
    let strs = [];
    for (let i = 0; i < personnelList.length; i++) {
      strs.push("(?,?,?,?,?)");
      arr.push(...personnelList[i]);
    }
    statement += strs.join(",");
    const result = await connection
      .execute(statement, [...arr])
      .catch((err) => {
        console.log(err);
      });
    return result[0];
  }
}

module.exports = new personnelService();
