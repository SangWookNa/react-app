import express from 'express';
import path from 'path';
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import os from 'os';

const app = express();
const PORT = process.env.PORT || 4000;

/** setup routers & static directory */
import api from './routes';

app.use('/api', api);

if (process.env.NODE_ENV == 'development') {
    app.use(express.static(path.join(__dirname, '..', 'public/')));
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, './../public', 'index.html'));
      });
}else{
    app.use(express.static(path.join(__dirname, '..', 'build/')));
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, './../build', 'index.html'));
      });
}

app.use(morgan('dev'));
app.use(bodyParser.json());


/** handle error */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
 
app.listen(PORT, () => {
console.log(`Check out the app at http://localhost:${PORT}`);
});
