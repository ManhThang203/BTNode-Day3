require("dotenv").config();

const mysql = require("mysql2/promise");

/**
 * Database configuration
 */
const databaseConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

/**
 * Create and return a connection pool
 */
const pool = mysql.createPool(databaseConfig);

/**
 * Test database connection
 */
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
  databaseConfig,
};
