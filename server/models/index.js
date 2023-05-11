import sequelize from '../database.js';
import {DataTypes} from 'sequelize';

const StudentModel = sequelize.define('student', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(100), allowNull: false},
    group: {type: DataTypes.STRING(50), allowNull: false},
    schema: {type: DataTypes.STRING(50), allowNull: false},
    attempt: {type: DataTypes.INTEGER, defaultValue: 1},
    file: {type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: []},
});


export {
    StudentModel,
};

