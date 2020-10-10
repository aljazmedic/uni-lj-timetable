import express, { Application, Request, Response, NextFunction } from 'express';
import PORT from './port'

if (process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}

const app: Application = express();


app.get('/*', (req: Request, res: Response) => {
    res.send('Express server running!');
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})