const express = require('express'); 
const router = express.Router() ; 
const User = require('../models/User'); 

// GET back all the posts 
router.get('/', async (req, res) => { 
    try {
        const listUsers = await User.find();
        return res.json(listUsers);
    } catch (error) {
        return res.json('loi')
    }
})

module.exports = router ; 