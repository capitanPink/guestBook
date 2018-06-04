const express = require('express');
const router = express.Router();

const { insertData, selectData, query } = require('../db/query');
const { customers, posts } = require('../constants/tables');

/* GET users listing. */
router.get('/test', (req, res, next) => {

  res.send('order: ' + req.query.order + 'shoe-color: ' + req.query.shoe.color);
});

const valuesNumber = (array) => {
	return array.map((el, index) => `$${index + 1}`).join();
}

router.post('/ADD_NEW_INQUERY', (req, res, next) => {
  const { customer_name: customerName, customer_email: customerEmail, post_text: postText }  = req.body;
  const customerTableColumns = Object.values(customers.columns).join();
  const customerTableValues = [customerName, customerEmail];
  insertData(customers.tableName, customerTableColumns, valuesNumber(customerTableValues), customerTableValues)
    .then(() => {
      const selectColumns = posts.columns.customerId;
      const selectCondition = `customer_email = '${customerEmail}'`;
      selectData(customers.tableName, selectColumns, selectCondition)
        .then(selectedId => {
          const customerId = selectedId[0].customer_id;
          const postTableColumns = Object.values(posts.columns).join();
          const postTableValues = [customerId, postText];
          insertData(posts.tableName, postTableColumns, valuesNumber(postTableValues), postTableValues);
        });
    });
});

router.get('/GET_POSTS', (req, res, next) => {
  const customerCustomersId = 'customers.customer_id';
  const postCustomerId = 'posts.customer_id';
  if (req.query.quantity === 'all') {
    query(`SELECT * FROM ${customers.tableName}
           LEFT JOIN ${posts.tableName} on ${customerCustomersId} = ${postCustomerId}
           ORDER BY ${customerCustomersId} DESC`)
      .then(response => res.json(response),
            error => console.log(error)
    )
  } else if (typeof parseInt(req.query.quantity) === 'number' && req.query.quantity !== undefined) {
    query(`SELECT * FROM ${customers.tableName}
           LEFT JOIN ${posts.tableName} on ${customerCustomersId} = ${postCustomerId}
           ORDER BY ${customerCustomersId} DESC
           LIMIT ${req.query.quantity} OFFSET ${req.query.offset}`)
      .then(response => res.json(response),
            error => console.log(error)
    )
  } else if (req.query.email) {
    const email = req.query.email;
    query(`SELECT * FROM ${customers.tableName} 
          LEFT JOIN ${posts.tableName} on ${customerCustomersId} = ${postCustomerId}
          WHERE LOWER(${customers.columns.customerEmail}) = LOWER('${email}')
          ORDER BY ${customerCustomersId} DESC`)
      .then(response => res.json(response),
      error => console.log(error)
    )
  } else if (req.query.name) {
    const name = req.query.name;
    query(`SELECT * FROM ${customers.tableName} 
          LEFT JOIN ${posts.tableName} on ${customerCustomersId} = ${postCustomerId}
          WHERE LOWER(${customers.columns.customerName}) = LOWER('${name}')
          ORDER BY ${customerCustomersId} DESC`)
      .then(response => res.json(response),
      error => console.log(error)
    )
  }
});

module.exports = router;
