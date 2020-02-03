const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const CompanyModel = require('./models/company');
const WorkerModel = require('./models/worker');

const sequelize = new Sequelize('cl', 'ra', '12', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = UserModel(sequelize, Sequelize);
const Company = CompanyModel(sequelize, Sequelize);
const Worker = WorkerModel(sequelize, Sequelize);

Company.hasMany(Worker);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
    initDatabase();
  });

function initDatabase() {
    User.create({name: 'Bob', login: 'bob', password: '123'});
    User.create({name: 'Mark', login: 'mark', password: '345'});
    Company.create({name: 'Slack', email: 'sales@slackmail.ua', phone: '+13213212321'}).then(
        function (x) {
            Worker.create({name: 'Zoe', email: 'zoe@slack.net', companyId: x.dataValues['id']})
        }
    );
    Company.create({name: 'Brix', email: 'info@brix.cn', phone: '+53215658965'}).then(
        function (x) {
            Worker.create({name: 'Ivan', email: 'ivan@brix.net', companyId: x.dataValues['id']});
        });
    Company.create({name: 'Skynet LLC', email: 'contacts@sky.net', phone: '+03333665468'}).then(
        function (x) {
            Worker.create({name: 'Joe', email: 'joe@sky.net', companyId: x.dataValues['id']});
        });
}
//
// module.exports = {
//   User,
//   Company,
//   Worker
// };