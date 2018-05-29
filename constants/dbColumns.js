const usersTableColumns = [
  'cutomer_id INT AUTO_INCREMENT PRIMARY KEY',
  'customer_name VARCHAR(25)',
  'customer_email VARCHAR(100)'
].join();

const usersPostColumns = [
  'post_id INT AUTO_INCREMENT PRIMARY KEY',
  'customer_id INT',
  'post_text VARCHAR(500)',
  'FOREIGN KEY (customer_id) REFERENCES customers(customer_id)'
].join();

exports.usersTableColumns = usersTableColumns;
exports.usersPostColumns = usersPostColumns;