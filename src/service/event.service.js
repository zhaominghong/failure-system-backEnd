const connection = require("../app/database");

class eventService {
  async create(event) {
    const {
      title,
      description,
      location,
      status,
      handler_id,
      handler_time,
      manager_id,
      pipeline_id,
      level,
    } = event;
    const submit_time = new Date().toLocaleString();
    const statement =
      "INSERT INTO EVENT (title, description, location, status, submit_time, handler_id, handler_time, manager_id, pipeline_id, level) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const result = await connection
      .execute(statement, [
        title,
        description,
        location,
        status,
        submit_time,
        handler_id,
        handler_time,
        manager_id,
        pipeline_id,
        level,
      ])
      .catch((err) => {
        console.log(err);
      });
    return result[0];
  }

  async getEventById(id) {
    const statement = "SELECT * FROM EVENT WHERE ID = ?";
    const result = await connection.execute(statement, [id]).catch((err) => {
      console.log(err);
    });
    return result[0][0];
  }

  async getEventList(params) {
    const { limit, start } = params;
    if (limit !== undefined && start !== undefined) {
      const statement = "SELECT * FROM EVENT LIMIT ? , ?";
      const result = await connection
        .execute(statement, [start, limit])
        .catch((err) => {
          console.log(err);
        });
      return result[0];
    } else {
      const statement = "SELECT * FROM EVENT";
      const result = await connection.execute(statement).catch((err) => {
        console.log(err);
      });
      return result[0];
    }
  }
  async getEventCount() {
    const statement = "SELECT COUNT(*) FROM EVENT";
    const result = await connection.execute(statement).catch((err) => {
      console.log(err);
    });
    return result[0][0]["COUNT(*)"];
  }

  async delete(id) {
    const statement = "DELETE FROM EVENT WHERE id = ?;";
    const result = await connection.execute(statement, [id]).catch((err) => {
      console.log(err);
    });
    return result[0];
  }

  async batchDelete(ids) {
    const statement = `DELETE FROM EVENT WHERE id IN (${ids.join(",")})`;
    const result = await connection.execute(statement).catch((err) => {
      console.log(err);
    });
    return result[0];
  }
}

module.exports = new eventService();
