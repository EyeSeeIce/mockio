

const { Client } = require('pg');

const client = new Client({
  user: 'gen_user',
  host: '87.249.44.136',
  database: 'default_db',
  password: 'fho3ytfxo',
  port: 5432,
});

client.connect();

client.q = async function (string) {
  const data = await client.query(string)
  return data.rows.length === 0 ? false : data.rows
}

module.exports = client