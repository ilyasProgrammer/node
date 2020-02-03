'use strict';
module.exports = (sequelize, type) => {
    var Worker = sequelize.define('Worker', {
                id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        email: type.STRING,
    });

    return Worker;
};
