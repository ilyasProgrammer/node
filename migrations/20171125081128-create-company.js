'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Companies', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Companies');
    }
};
