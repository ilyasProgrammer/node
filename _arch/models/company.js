'use strict';
module.exports = (sequelize, type) => {
    var Company = sequelize.define('Company', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        email: type.STRING,
        phone: type.STRING
    });

    Company.associate = function (models) {
        models.Company.hasMany(models.Worker);
    };

    return Company;
};
