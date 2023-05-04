const connection = require("../app/database");

class taskService {
  async create(task) {
    const {
      event_id,
      title,
      description,
      handler_id,
      handler_name,
      handler_type,
      status,
      start_time,
      end_time,
      created_time,
      updated_time,
    } = task;
    const statement =
      "INSERT INTO TASK (event_id, title, description, handler_id, handler_name, handler_type, status, start_time, end_time, created_time, updated_time) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?);";
    const result = await connection
      .execute(statement, [
        event_id,
        title,
        description,
        handler_id,
        handler_name,
        handler_type,
        status,
        start_time,
        end_time,
        created_time,
        updated_time,
      ])
      .catch((err) => {
        console.log(err);
      });
    return result[0];
  }

  async getTaskById(id) {
    const statement = "SELECT * FROM TASK WHERE ID = ?";
    const result = await connection.execute(statement, [id]).catch((err) => {
      console.log(err);
    });
    return result[0][0];
  }

  async getTaskList(params) {
    const { limit, start } = params;
    if (limit !== undefined && start !== undefined) {
      const statement = "SELECT * FROM TASK LIMIT ? , ?";
      const result = await connection
        .execute(statement, [start, limit])
        .catch((err) => {
          console.log(err);
        });
      return result[0];
    } else {
      const statement = "SELECT * FROM TASK LIMIT";
      const result = await connection.execute(statement).catch((err) => {
        console.log(err);
      });
      return result[0];
    }
  }

  async getTaskCount() {
    const statement = "SELECT COUNT(*) FROM TASK";
    const result = await connection.execute(statement).catch((err) => {
      console.log(err);
    });
    return result[0]["COUNT(*)"];
  }
}

module.exports = new taskService();
