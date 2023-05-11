import pdf from 'pdf-creator-node';
import fs from 'fs';

class ExportService {
    async createPDFFile(name, group, dataURI, department, schemaTitle, isCorrect) {
        const html = fs.readFileSync('files/templates/schema.html', {encoding: 'utf-8'});
        const student = name.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
        const fileName = `${schemaTitle}_${student}_${Date.now()}.pdf`

        const document = {
            html: html,
            data: {
                name: student,
                group,
                department,
                schemaTitle,
                img: dataURI,
                isCorrect: isCorrect ? 'Схема була складена правильно' : 'Схема була складена неправильно',
                date: new Date().toLocaleString()
            },
            path: `./files/export/${fileName}`,
            type: '',
        };
        // console.log(document);
        await pdf.create(document, {
            format: 'A4',
            orientation: 'landscape',
        })
        return fileName
    }
}

export default new ExportService();
