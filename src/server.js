import http from 'http';
import mongoose from 'mongoose';

import {app} from './app.js';

mongoose.set('strictQuery', false);

const port = 8000;
const MONGO_URL = "mongodb+srv://riseEcoApi:sb4ZPwJvppYdysZZ@riseecocluster.mzwagai.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully!');
})

mongoose.connection.once('error', (err) => {
    console.error(err);
})

await mongoose.connect(MONGO_URL);

server.listen(port, () => {
    console.log('listening on port ' + port);
})