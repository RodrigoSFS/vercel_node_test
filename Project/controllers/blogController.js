const Blog = require('../models/blog');
// The functions will be written on the mdn naming convention.
// blog_index, blog_details, blog_create_get,  blog_create_post, blog_delete

const blog_index = (req, res) =>{
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('blogs/index', { title: 'All Blogs', blogs: result });
        // console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
};

const blog_details = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { title: 'Blog details', blog: result});
        })
        .catch((err) => {
            res.render('404', { title: "Blog not found..."})
        });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create'});
}

const blog_create_post = (req, res) => {
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
}

const blog_delete = (req, res) => {
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
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}