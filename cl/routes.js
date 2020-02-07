module.exports = app => {
  const contr = require("./controller.js");

  var router = require("express").Router();
  // Companies
  router.get('/companies', contr.findAllCompanies);
  router.post('/companies', contr.createCompany);
  router.put('/companies/:id', contr.updateCompany);
  router.delete('/companies/:id', contr.deleteCompany);
  router.get('/companies_and_workers', contr.getCompaniesWithWorkers);
  // router.get('/companies/:companyId/users', contr.getUsersOfCompany);
  // Workers
  router.get('/workers', contr.findAllWorkers);
  router.post('/workers', contr.createWorker);
  router.put('/workers/:id', contr.updateWorker);
  router.delete('/workers/:id', contr.deleteWorker);
  // Users
  router.get('/users', contr.findAllUsers);
  router.post('/users', contr.createUser);
  router.put('/users/:id', contr.updateUser);
  router.delete('/users/:id', contr.deleteUser);
  app.use('/', router);
};
