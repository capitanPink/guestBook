const usersTableColumns = [
  'customer_id SERIAL PRIMARY KEY',
  'customer_name VARCHAR(25)',
  'customer_email VARCHAR(50) UNIQUE'
].join();

const usersPostColumns = [
  'post_id SERIAL PRIMARY KEY',
  'customer_id INT',
  'post_text VARCHAR(500)',
  'FOREIGN KEY (customer_id) REFERENCES customers(customer_id)'
].join();

exports.usersTableColumns = usersTableColumns;
exports.usersPostColumns = usersPostColumns;