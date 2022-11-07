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
router.post('/update/:postId' , async (req, res) => {
    const title =  req.body.title
    const id = req.params.postId
    try {
        const updatePost = await Post.findOneAndUpdate({_id : id}, {
            title, 
        })
        res.json('cap nhat thanh cong')
    } catch (error) {
        res.json('cap nhat khong thanh cong')
    }
})


module.exports = router ; 