import exportService from '../services/ExportService.js';

class ExportController {
    async getPDFSchema(request, response, next) {
        try {
            const {name, group, dataURI, department, schemaTitle} = request.body;
            const filePath = await exportService.createPDFFile(name, group, dataURI, department, schemaTitle);
            return response.json({filePath});
        } catch (e) {
            next(e);
        }
    }
}

export default new ExportController();