import os, { networkInterfaces } from 'os'
const nets = networkInterfaces();
let theAddress = 'localhost';

//Iterates through the network interfaces and picks the last one.
for (const name of Object.keys(nets)) {
    for (const net of nets[name] ||[]) {
        // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            theAddress=net.address;
        }
    }
}

const hostname = process.env.HOSTNAME || theAddress;

export default hostname;