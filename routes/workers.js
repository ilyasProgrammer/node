var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function (req, res) {
  models.Worker.findAll({}).then(function (companies) {
    res.status(200).json(companies)
  });
});

module.exports = router;
