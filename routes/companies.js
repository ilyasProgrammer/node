var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function (req, res) {
  models.Company.findAll({}).then(function (companies) {
    res.status(200).json(companies)
  });
});

router.post('/create', async (req, res, next) => {
  const z = await req.validate('createUser');
  try {
    const company = await models.Company.create({name: req.body.name, email: req.body.email, phone: req.body.phone});
    res.status(200).json(company.dataValues);
  } catch (e) {
    next(e)
  }
});

const { body } = require('express-validator/check');

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [
        body('userName', 'userName doesnt exists').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('phone').optional().isInt(),
        body('status').optional().isIn(['enabled', 'disabled'])
       ]
    }
  }
};

module.exports = router;
