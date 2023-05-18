const connection = require("../app/database");

class auditService {
    async create(audit) {
      const { event_id, option } = audit;
      const statement =
        "INSERT INTO AUDIT (event_id, audit_option) VALUES ( ?, ?);";
      const result = await connection
        .execute(statement, [ event_id, option ])
        .catch((err) => {
          console.log(err);
        });
      return result[0];
    }

    async getAuditById(id) {
      const statement = "SELECT audit.*, event.title,event.description,event.location FROM AUDIT WHERE AUDIT.ID = ?";
      const result = await connection.execute(statement, [id]).catch((err) => {
        console.log(err);
      });
      return result[0][0];
    }

    async getAuditList(params) {
    const { limit, start } = params;
    if (limit !== undefined && start !== undefined) {
        const statement = "SELECT event.* FROM EVENT LEFT JOIN audit ON event.id = audit.event_id WHERE audit.event_id IS NULL LIMIT ? , ? ";
        const result = await connection
        .execute(statement, [start, limit])
        .catch((err) => {
          console.log(err);
        });
        return result[0];
    } else {
          const statement = "SELECT event.* FROM EVENT LEFT JOIN audit ON event.id = audit.event_id WHERE audit.event_id IS NULL";
          const result = await connection.execute(statement).catch((err) => {
            console.log(err);
          });
          return result[0];
        }
    }
    async getAuditCount() {
        const statement = "SELECT COUNT(*) FROM EVENT LEFT JOIN audit ON event.id = audit.event_id WHERE audit.event_id IS NULL";
        const result = await connection.execute(statement).catch((err) => {
          console.log(err);
        });
        return result[0][0]["COUNT(*)"];
    }
    async getRecordCount() {
        const statement = "SELECT COUNT(*) FROM AUDIT";
        const result = await connection.execute(statement).catch((err) => {
          console.log(err);
        });
        return result[0][0]["COUNT(*)"];
    }
    async getRecordList(params) {
        const { limit, start } = params;
        if (limit !== undefined && start !== undefined) {
          const statement = "SELECT event.title,event.description,event.level,event.location,event.status,event.submit_time,event.handler_time,audit.audit_option,audit.event_id FROM AUDIT,EVENT LIMIT ? , ?";
          const result = await connection
            .execute(statement, [start, limit])
            .catch((err) => {
              console.log(err);
            });
          return result[0];
        } else {
          const statement = "SELECT event.title,event.description,event.level,event.location,event.status,event.submit_time,event.handler_time,audit.audit_option,audit.event_id FROM AUDIT,EVENT";
          const result = await connection.execute(statement).catch((err) => {
            console.log(err);
          });
          return result[0];
        }
      }
}

module.exports = new auditService();
