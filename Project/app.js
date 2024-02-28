const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');

// express app
const app = express();

// connect to mongodb
const  dbURI = 'mongodb+srv://nemo29339:1234@nodetuts.lsdczcs.mongodb.net/nodetuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
// the view module
app.set('view engine', 'ejs');
//app.set('views', 'myviews');

// listen for requests
// the intention now is to only listen to requests onthe 3000 port if the connection to the database is successful
// app.listen(3000);

// Middleware: Is every piece of code that stands between the request and the response, all the routing functions are essencially middleware, for example.
// These are examples with node, but there's packages that make writing midlewares easier.
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     console.log();
//     next();
// });

// app.use((req, res, next) => {
//     console.log('in the next middleware:');
//     console.log();
//     next();
// });

// Middeware and static files
app.use(express.static('public'));
app.use(morgan('dev'));

// // mongoose and mongo sandbox routes
// // Handler to create a blog when a GET request is made to the specified route.
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     // When we're saiving, we use the save() function on a instance of Blog.
//     // Those functions of save, find, findById are asyncronous functions, it takes some time, so it's we put the then() and catch() functions for the applictacion to wait until
//     // it is completely done.
//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// // Handler to send to the browser all blogs when a GET request is made to the specified route.
// app.get('/all-blogs', (req, res) => {
//     // When we're searching, we use the find() function on the Blog itself.
//     Blog.find()
//         .then((result) =>{
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// // Handler to send a single blog to the browser when a GET request is made to the specified route.
// app.get('/single-blog', (req, res) => {
//     Blog.findById('65df7b6f5b345a796eba0ae0')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

app.get('/', (req, res) => {
    // const blogs = [
    //     {title: 'Bla', snippet: 'Loren Ipsium Loren Ipsium Loren Ipsium Loren Ipsium Loren Ipsium'},
    //     {title: 'Blabla', snippet: 'Loren Ipsium Loren Ipsium Loren Ipsium Loren Ipsium Loren Ipsium'},
    //     {title: 'Blablabla', snippet: 'Loren Ipsium Loren Ipsium Loren Ipsium Loren Ipsium Loren Ipsium'},

    // ];
    // // it altomaticly sets the content type and the status code.
    // //res.send('<p> Home page </p>');

    // // the first parameter asks for a abolute path of the file from the root of the computer to the file itself,
    // // so we put the relative path as the first argumetn and set the root on the second, using the node command that express what the path to the folder that you're in.
    // // res.sendFile('./views/index.html', { root: __dirname });
    
    // // We no longer want to send a static HTML file, we want to send a View.
    // res.render('index', { title: 'Home', blogs: blogs});

    res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    // res.sendFile('/views/about.html', { root: __dirname });
    res.render('about', { title: 'About'})
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create'});
});

// // redirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

// 404 page
// It's going to search the urls from top to bottom, the app.use is going to fire each time that express listen a GET request, if if finds a match, it's going to return
// the file as planned, if it doesn't find a match, it's going to send the 404.html file.
// So that code needs to stay on the bottom, the position matters because of what was explained above.
app.use((req, res) => {
    // res.status(404).sendFile('/views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404'});
});

// NoSQL vs SQL
/*
SQL databases stores data in Tables, Rows and Columns to store records of data and makes relations between them.
NoSQL databases use collections and documents.
*/ 