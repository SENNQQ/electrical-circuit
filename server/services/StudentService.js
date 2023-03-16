import {StudentModel} from '../models/index.js';

class StudentService {
    async createOrAddAttempt(name, group) {
        const [_, isExist] = await StudentModel.findOrCreate({where: {name, group}});
        if (isExist)
            await StudentModel.update({attempt: 2}, {where: {name, group}});

        return true
    }
}

export default new StudentService();