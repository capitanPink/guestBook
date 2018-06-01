const express = require('express');
const router = express.Router();

const { insertData } = require('../db/query');

/* GET users listing. */
router.get('/test', (req, res, next) => {

  res.send('order: ' + req.query.order + 'shoe-color: ' + req.query.shoe.color);
});

const elements = (array) => {
	return array.map(el => `"${el}"`).join();
}

router.post('/ADD_NEW_INQUERY', (req, res, next) => {
  const customerTable = 'customers';
  const { customer_name: customerName, customer_email: customerEmail }  = req.body;
  // const customerEmail = req.body.data.customer_email;
  // console.log(req.body);
  const tableColumns = ['customer_name', 'customer_email'].join();
  const tableValues = [customerName, customerEmail];
  insertData(customerTable, tableColumns, elements(tableValues));
  // res.send(req.body);
});

module.exports = router;
