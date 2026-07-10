const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
    console.error('Error on PostgreSQL client', err);
    process.exit();
});

module.exports = pool;