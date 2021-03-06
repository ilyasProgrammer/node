'use strict';
module.exports = (sequelize, DataTypes) => {
    var Worker = sequelize.define('Worker', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
    });

    return Worker;
};
