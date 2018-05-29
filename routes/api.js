const express = require('express');
const pool = require('.db/index');

const router = express.Router();

/* GET users listing. */
router.get('/GET_ALL_NOTES', (req, res, next) => {

  res.send('respond with a resource');
});

module.exports = router;
