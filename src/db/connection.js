import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

export const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
export async function checkDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('Conexão com o banco de dados foi bem-sucedida!');
  } catch (err) {
    console.error('Erro ao conectar-se ao banco de dados:', err.message);
  }
}

