import studentService from "../services/StudentService.js";
import exportService from "../services/ExportService.js";

class StudentController {
    async addStudent(request, response, next) {
        try {
            const {name, group, dataURI, department, schemaTitle, isCorrect, schema} = request.body;
            const filePath = await exportService.createPDFFile(name, group, dataURI, department, schemaTitle, isCorrect);
            await studentService.add(name, group, schema, filePath);
            return response.json({filePath: `http://localhost:4000/files/${filePath}`});
        } catch (e) {
            next(e)
        }
    }

    async getStudent(request, response, next) {
        try {
            const {name, group} = request.body
            const student = await studentService.get(name, group)
            return response.json({student})
        } catch (e) {
            next(e)
        }
    }
}

export default new StudentController()
