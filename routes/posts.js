const express = require('express'); 
const router = express.Router() ; 
const Post = require('../models/Post'); 

// GET back all the posts 
router.get('/', async (req, res) => { 
    try {
        const listPosts = await Post.find();
        return res.json(listPosts);
    } catch (error) {
        return res.json('loi')
    }
})

// submits a post
router.post('/', async (req,res) => { 
    const post = new Post({ 
        title: req.body.title, 
        description: req.body.description
    });

    console.log(post);

    try {
        const savedPost = await post.save(); 
        res.json(savedPost)
    } catch (err) {
        res.json('loi')
    }
})

// specific post 
router.get('/:postId', async (req, res) => { 
    console.log(req.params.postId);
    try {
        const post = await Post.findById(req.params.postId); 
        res.json(post);
    } catch (error) {
        res.json('could not found')
    }
})

// delete post 
router.delete('/:postId', async (req, res) => { 
    try {
        const removedPost = Post.deleteOne({_id: req.params.postId}, (err, result) => { 
            if(err) {
                console.log(err);
            } else { 
                console.log("result : ", result);
            }
        }); 
        res.json(`da xoa thanh cong ${removedPost}`)
    } catch (error) {
        res.json('could not delete')
    }
});

// update a post 
router.patch('/:postId' , (req, res) => {
    console.log(req.body.title);
    try {
        const updatePost = Post.where({_id: req.params.postId}).update(
            {title : req.body.title}
        )
        res.json(updatePost)
    } catch (error) {
        res.json({message : error})
    }
})


module.exports = router ; 