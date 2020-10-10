import {Request, Response} from 'express'
import morgan from 'morgan';
import path from 'path';
//const rfs = require('rotating-file-stream');
import * as rfs from 'rotating-file-stream';
//logger setup... Reference: https://www.npmjs.com/package/morgan

morgan.token('statusColor', (req:Request, res:Response, args) => {
    //custom token for console logging; colors the status code corresponding
    // get the status code if response written
    const status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
        ? res.statusCode
        : 0

    // get status color
    var color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
            : status >= 300 ? 36 // cyan
                : status >= 200 ? 32 // green
                    : 0; // no color
    return '\x1b[' + color + 'm' + status + '\x1b[0m'; //Set the color, write the status, reset to white
});

const consoleLogger = morgan(
    //logger for console
    '[:date[iso]] :method :url :statusColor :response-time ms - :res[content-length]',
    { 
        //skip: function (req, res) { return res.statusCode < 300 }, //For when we do not want OK messages in the console
        stream:process.stdout
    }
);


//function that generates names for log files
const nameFormatGenerator: rfs.Generator = (time, index) => {
    if (!time) return "file.log";
    const datetime = <Date>time;
    return `file-${datetime.toISOString().substring(0,10)}-${index}.log.gz`
}

//file stream to be accessed by logger
const fileStream = rfs.createStream(
    nameFormatGenerator, {
    size: '10M',
    compress: 'gzip',// (source, dest) => "cat " + source + " | gzip -c9 > " + dest, //Exsplicitno podajanje metode
    interval: '30m',
    path: 'logs/',
}
);

const fileLogger = morgan(
    'common',
    {
        stream: fileStream
    }
);

export default [consoleLogger, fileLogger];