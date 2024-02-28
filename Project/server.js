const http = require ('http');
const fs = require ('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);

    // lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    }) 

    greet();
    greet();

    // set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // res.write('<head><link rel="stylesheet" href="#"</head>')
    // res.write('<h1> hello, fellas </h1>');
    // res.write('<p> hello again, fellas </p>');
    // res.end();

    // send an html file
    // fs.readFile('./views/index.html', (err, data) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log (err);
            // res.write('<h1>' + err.toString() + '</h1>')
            res.end();
        } else {
            // res.write(data); That's not completely necessary, we're writing one thing, in cases of writing multiple things, maybe.
            res.end(data);
        }

    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening for querests on port 3000')
});

// localhost is a loop-back IP adress, It's IP adresss is 127,0.0.1 and it connects us back to our own computer, which is acting as a host to our website.

// A Port number are like "doors" into a computer, it represents a specific gateway or port on our computer.

// Commmom status code.
/*

200 - OK
301 - Resource moved
404 - Not Found
500 - Internal server error

---------

100 Range - informational responses for the browsew
200 Range - sucess codes
300 range - codes for redirects
400 Range - user or client error codes
500 Range - server error codes

*/ 