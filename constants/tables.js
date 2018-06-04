exports.customers = {
  tableName: 'customers',
  columns: {
    customerName:'customer_name',
    customerEmail: 'customer_email'
  }
  
}

exports.posts = {
  tableName: 'posts',
  columns: {
    customerId: 'customer_id',
    postText: 'post_text'
  }
}