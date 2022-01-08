const express = require("express")
const router = express.Router()
const {create,getAllblogs,singleBlog,removeblog,update} = require('../controllers/blogController')
const {requireLogin} = require("../controllers/authController")

// const { remove } = require("../models/blogs")

router.post('/create',requireLogin,create)
router.get('/blogs',getAllblogs)
router.get('/blog/:slug',singleBlog)
router.delete('/blog/:slug',removeblog)
router.put('/blog/:slug',update)

module.exports = router