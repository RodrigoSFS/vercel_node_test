const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

// blog routes
router.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result });
        // console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

// POST handler
router.post('/blogs', (req, res) => {
    // In order to get the data which is submitted no the form we need some middleware. We'll use the one which comes with express.
    // console.log(req.body);

    const blog = new Blog(req.body); // The body of the POST request is a JSON with the key value pairs that are specified as the atributes for our blog object!

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
            // console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

router.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create'});
});

// Route parameters. On 
router.get('/blogs/:id', (req,res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            res.render('details', { title: 'Blog details', blog: result});
        })
        .catch((err) => {
            console.log(err);
        });

});

router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            // this is a ajax request, so we cant' redirect. We have to send back a JSON or text data back to the browser.
            // So what that next line does is send a JSON with a redirect property. Look into details.ejs for further explanation of what hrouterens next.
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;