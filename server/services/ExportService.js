import pdf from 'pdf-creator-node';
import fs from 'fs';

class ExportService {
    async createPDFFile(name, group, dataURI, department, schemaTitle) {
        const html = fs.readFileSync('files/templates/schema.html', {encoding: 'utf-8'});

        const fileName = `${schemaTitle}_${name}_${Date.now()}.pdf`

        const document = {
            html: html,
            data: {
                name,
                group,
                department,
                schemaTitle,
                img: dataURI,
            },
            path: `./files/export/${fileName}`,
            type: '',
        };
        // console.log(document);
        await pdf.create(document, {
            format: 'A4',
            orientation: 'landscape',
        })
        return `http://localhost:4000/files/${fileName}`
    }
}

export default new ExportService();