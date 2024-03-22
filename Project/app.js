const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes')

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
app.set('views', path.join(__dirname, 'views'));

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
app.use(express.urlencoded({ extended: true })); // That takes all of the URL encodded data which is passed and put it on the request object. We're accessing the Body of the HTTP  
//                                               request  (all of the data). Without that line of code we don't have acess the the contents of the body of the request (Undefined).
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
app.use('/blogs', blogRoutes);

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

// Request Types
/*
GET requests to get a resource.

POST requests to create new data.

DELETE requests to delete data.

PUT requests to update data.

We CAN use the same routes for different kinds of requests.
We have /blogs which is requested with a GET request.
We also have /blogs/create, which also is requested witha a GET request.
And we'll have a /blogs rounte which is interacted with a POST request, to create a blog.
We'll also have a /blogs/:id, "id" being a variable responsible to represent the id of a specific blog, enabling us to GET a specific blog with a GET request.
We'll have /blogs/:id again but with a DELETE request, to delete a specific blog with its id.
And a /blogs/:id, also, but with a PUT request, to UPDATE a blog with of a specific id.

And that's the route structure of a simple CRUDE application.

To make a POST Request when we click on the "Submit" button on the end of our Form on /blog/create, we could use the Fetch API or another asyncronous library for JavaScript,
or we cando it directly on the form itself. That's what we're gonna do.

*/