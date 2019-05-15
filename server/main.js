import express from 'express';
import path from 'path';
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());

/** setup routers & static directory */
import api from './routes';

app.use('/api', api);

if (process.env.NODE_ENV == 'development') {
    app.use(express.static(path.join(__dirname, '..', 'public/')));
    // app.get('/*', function (req, res) {
    //     res.sendFile(path.join(__dirname, './../public', 'index.html'));
    //   });
}else{
    app.use(express.static(path.join(__dirname, '..', 'build/')));
    // app.get('/*', function (req, res) {
    //     res.sendFile(path.join(__dirname, './../build', 'index.html'));
    //   });
}

/** mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost:27017/invitation');

/** handle error */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
 
app.listen(PORT, () => {
console.log(`Check out the app at http://localhost:${PORT}`);
});
