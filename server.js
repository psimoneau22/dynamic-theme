const express = require('express');
const util = require('util');
const fs = require('fs');
const app = express();

app.use('/index.css', (req, resp, next) =>
    fs.readFile(`${__dirname}/dist/index.css`, { encoding: 'utf8'}, (err, raw) => {
        const theme = getRandomTheme(); // get from db ..etc
        const themedCss = raw.replace(/"@@theme\/(primary|accent)"/g, (match, themeProp) => theme[themeProp]); // this can be cached

        resp.type('text/css');
        resp.send(themedCss);
    }));

app.use(express.static('wwwroot'));
app.use(express.static('dist'));

app.listen(3000, () => console.log('listening'));

const values = [ 'lightblue', 'lightsalmon', 'lightgreen']; // these can be rgb or hex etc
function getRandomTheme() {
    const random1 = Math.floor(Math.random() * 3);
    const random2 = Math.floor(Math.random() * 3);
    return {
        primary: values[random1],
        accent: values[random2]
    }
}