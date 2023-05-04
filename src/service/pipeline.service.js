const connection = require("../app/database");

class pipelineService {
  async create(pipeline) {
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
    } = pipeline;
    const submit_time = new Date().toLocaleString();
    const statement =
      "INSERT INTO PIPELINE (title, description, location, status, submit_time, handler_id, handler_time, manager_id, pipeline_id, level) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
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

  async getPipelineById(id) {
    const statement = "SELECT * FROM PIPELINE WHERE ID = ?";
    const result = await connection.execute(statement, [id]).catch((err) => {
      console.log(err);
    });
    return result[0][0];
  }

  async getPipelineList(params) {
    const { limit, start } = params;
    if (limit !== undefined && start !== undefined) {
      const statement = "SELECT * FROM PIPELINE LIMIT ? , ?";
      const result = await connection
        .execute(statement, [start, limit])
        .catch((err) => {
          console.log(err);
        });
      return result[0];
    } else {
      const statement = "SELECT * FROM PIPELINE";
      const result = await connection.execute(statement).catch((err) => {
        console.log(err);
      });
      return result[0];
    }
  }
  async getPipelineCount() {
    const statement = "SELECT COUNT(*) FROM PIPELINE";
    const result = await connection.execute(statement).catch((err) => {
      console.log(err);
    });
    return result[0]["COUNT(*)"];
  }
}

module.exports = new pipelineService();
