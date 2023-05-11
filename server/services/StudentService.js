// noinspection JSCheckFunctionSignatures

import {StudentModel} from '../models/index.js';
import {Sequelize} from "sequelize";
import sequelize from '../database.js'
import ApiError from "../exceptions/ApiError.js";

class StudentService {
    async get(name, group) {
        return await StudentModel.findAll({where: {name, group}})
    }

    async add(name, group, schema, filePath) {
        return await sequelize.transaction(async t => {
            const [_, isExist] = await StudentModel.findOrCreate({where: {name, group, schema}, transaction: t});
            if (!isExist) {
                if (_.attempt === 2)
                    throw ApiError.BadRequest('Перевищено кількість спроб')
                await StudentModel.update({
                    attempt: 2,
                    file: Sequelize.fn('array_append', Sequelize.col('file'), filePath)
                }, {where: {name, group, schema}, transaction: t});
            } else {
                await StudentModel.update({
                    attempt: 1,
                    file: Sequelize.fn('array_append', Sequelize.col('file'), filePath)
                }, {where: {name, group, schema}, transaction: t});
            }
            return true
        })
    }
}

export default new StudentService();
