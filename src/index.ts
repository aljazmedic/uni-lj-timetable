import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

import PORT from './port'
import HOSTNAME from './hostname'
import api from './routes'
import logger from './logger';
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
    require('dotenv').config();
}

const app: Application = express();
app.use(logger);
//app.use(helmet()); //Protects the header information
app.use('/api', api); //api routes for the scraper


app.get('*', (req: Request, res: Response) => {
    //default not found json response
    res.status(404).json({
        'message': "Not found"
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //default error handling for json
    console.error(req.url);
    console.error(err);
    if (!isDev) {
        return res.status(500).json({ message: "Internal server error" })
    }
    //give more information if in development mode
    return res.status(500).json({
        message: err.message,
        error: err.name,
        stack: err.stack?.split(/\n\s+/) || []
    });
})

app.listen(PORT,() => {
    console.log(`\tServer listening on network:\t\x1b[36mhttp://${HOSTNAME}:${PORT}/\x1b[0m`);
    console.log(`\t                And locally:\t\x1b[36mhttp://localhost:${PORT}/\x1b[0m`);
})