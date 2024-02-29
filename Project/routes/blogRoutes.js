const express = require('express');
const blogController = require('../controllers/blogController')

const router = express.Router();

// blog routes
// router.get('/blogs', (req, res) => {
//     Blog.find().sort({ createdAt: -1 })
//     .then((result) => {
//         res.render('index', { title: 'All Blogs', blogs: result });
//         // console.log(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// })

// Since we're separating the routers, the first argument of it don't need to bee put on both files, if it is, it'll stack on each other, like /blogs/blogs. so we don't need 
// to put it in here anymore, just a simple "/", the blogs will be put on the app.use('/blogs', blogRoutes);
router.get('/', blogController.blog_index)

// POST handler
router.post('/', blogController.blog_create_post)

router.get('/create', blogController.blog_create_get);

// Route parameters. On 
router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);

module.exports = router;