const { celebrate, Joi, errors, Segments } = require('celebrate');
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/companies', function(req, res) {
  models.Company.findAll({
  }).then(function(companies) {
    res.status(200).json(companies)
  });
});

// const customersCreateValidator = celebrate({
//     [Segments.BODY]: Joi.object().keys({
//         email: Joi.string().email().required(),
//         name: Joi.string().required(),
//         phone: Joi.string().required(),
//     }),
// });
// const updateCreateValidator = celebrate({
//     [Segments.BODY]: Joi.object().keys({
//         email: Joi.string().email(),
//         name: Joi.string(),
//         phone: Joi.string(),
//     }),
//     [Segments.PARAMS]: {
//         id: Joi.number().integer().required()
//     }
// });
//
// app.get('/companies', db.getCompanies);
// app.post('/companies', customersCreateValidator, db.createCompany);
// app.put('/companies/:id', updateCreateValidator, db.updateCompany);
// app.delete('/companies/:id', db.deleteCompany);
// app.get('/companies_and_users', db.getCompaniesWithUsers);
// app.get('/companies/:companyId/users', db.getUsersOfCompany);


module.exports = router;
