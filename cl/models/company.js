'use strict';
module.exports = (sequelize, DataTypes) => {
    var Company = sequelize.define('Company', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING
    });

    Company.associate = function (models) {
        Company.hasMany(models.Worker);
    };

    return Company;
};
