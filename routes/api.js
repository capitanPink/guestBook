const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/test', (req, res, next) => {

  res.send('order: ' + req.query.order + 'shoe-color: ' + req.query.shoe.color);
});

module.exports = router;
