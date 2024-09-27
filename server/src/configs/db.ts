import { Pool } from 'pg';

const pool = new Pool({
  user: 'user',
  host: 'postgres',
  database: 'notifications',
  password: 'password',
  port: 5432,
});

export default pool;

