
const pkg = require("pg")
const config = require("../../config.js")
const utils = require("util")
const { Pool } = pkg;

const sql_pool = new Pool({
  user: config.dbUser,
  database: config.dataBase,
  password: config.dbPassword,
  port: config.dbPort, // Correct property for port
  max: config.max,
  idleTimeoutMillis: config.idleTimeoutMillies, // Use "Millis" instead of "Millies"
  connectionTimeoutMillis: config.connectionTimeoutMillis // Ensure this key matches
});

const pool = {
  query: (sql, args) => {
    return utils.promisify(sql_pool.query).call(sql_pool, sql, args);
  }
};

module.exports = pool;
