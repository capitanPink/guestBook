const express = require('express');
const router = express.Router();

const { insertData, selectData } = require('../db/query');

/* GET users listing. */
router.get('/test', (req, res, next) => {

  res.send('order: ' + req.query.order + 'shoe-color: ' + req.query.shoe.color);
});

const valuesNumber = (array) => {
	return array.map((el, index) => `$${index + 1}`).join();
}

router.post('/ADD_NEW_INQUERY', (req, res, next) => {
  const customersTable = 'customers';
  const postsTable = 'posts';
  const { customer_name: customerName, customer_email: customerEmail, post_text: postText }  = req.body;
  const customerTableColumns = ['customer_name', 'customer_email'].join();
  const customerTableValues = [customerName, customerEmail];
  insertData(customersTable, customerTableColumns, valuesNumber(customerTableValues), customerTableValues)
    .then(() => {
      selectData(customersTable, 'customer_id', `customer_email = '${customerEmail}'`)
        .then(selectedId => {
          const customerId = selectedId[0].customer_id;
          const postTableColumns = ['customer_id', 'post_text'].join();
          const postTableValues = [customerId, postText];
          insertData(postsTable, postTableColumns, valuesNumber(postTableValues), postTableValues)
        });
    });
  // const selectedData = selectData(customersTable, 'customer_id', `customer_email = '${customerEmail}'`);
  // selectedData.then(res => console.log('res from table', res));
  // res.send(req.body);
});

module.exports = router;
