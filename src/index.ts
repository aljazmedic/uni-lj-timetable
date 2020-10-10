import express, { Application, Request, Response, NextFunction } from 'express';
import PORT from './port'
import api from './routes'
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
    require('dotenv').config();
}

const app: Application = express();


app.use('/api', api);
app.get('*', (req: Request, res: Response) => {
    res.status(404).json({
        'message': "Not found"
    });
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(req.url);
    console.error(err);
    if (!isDev) {
        return res.status(500).json({ message: "Internal server error" })
    }
    return res.status(500).json({
        message: err.message,
        stack: err.stack?.split(/\n\s+/) || []
    });
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})