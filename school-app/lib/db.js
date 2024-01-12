import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};
