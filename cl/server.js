const express = require('express');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors, Segments } = require('celebrate');
const app = express();
const db = require('./queries');
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

const customersCreateValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
    }),
});
const updateCreateValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email(),
        name: Joi.string(),
        phone: Joi.string(),
    }),
    [Segments.PARAMS]: {
        id: Joi.number().integer().required()
    }
});

app.get('/companies', db.getCompanies);
app.post('/companies', customersCreateValidator, db.createCompany);
app.put('/companies/:id', updateCreateValidator, db.updateCompany);
app.delete('/companies/:id', db.deleteCompany);
app.get('/companies_and_users', db.getCompaniesWithUsers);
app.get('/companies/:companyId/users', db.getUsersOfCompany);
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
