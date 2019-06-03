import express from 'express';
import path from 'path';
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import mongoose from 'mongoose';
//import winston from './config/winston'
import winston from './config/winston'

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev', { skip: function (req, res) { return res.statusCode === 304 } }));

app.use(morgan('combined', {
    stream: winston.stream,
    skip: function (req, res) { return res.statusCode === 304 }
}));
app.use(bodyParser.json());

/** setup routers & static directory */
import api from './routes';

app.use('/api', api);

if (process.env.NODE_ENV == 'development') {
    app.use(express.static(path.join(__dirname, '..', '/')));
    // app.get('/*', function (req, res) {
    //     res.sendFile(path.join(__dirname, './../public', 'index.html'));
    //   });
} else {
    app.use(express.static(path.join(__dirname, '..', '/')));
    // app.get('/*', function (req, res) {
    //     res.sendFile(path.join(__dirname, './../build', 'index.html'));
    //   });
}

/** mongodb connection */
const db = mongoose.connection;
db.once('open', () => { winston.log('info', 'Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost:27017/invitation', function (err) {
    if (err) winston.error(err.stack);
});

/** handle error */
app.use((err, req, res, next) => {
    winston.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    winston.log('info', `Check out the app at http://localhost:${PORT}`);
});
