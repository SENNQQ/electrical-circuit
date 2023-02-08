import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({limit: '50mb'}));
app.use('/files', express.static('files'));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));

app.use('/api', routes);
app.use(errorMiddleware);

// app.get('/download/excels/:filePath', (request, response) => {
//     if (!request.params.filePath) {
//         return response.send('File not found');
//     }
//     response.download('./excels/' + request.params.filePath);
// });

const start = async () => {
    try {
        app.listen(Number(PORT), () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

await start();