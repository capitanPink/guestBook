const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'guestbook',
    port: 5432
})

exports.pool = pool;