const express = require('express')
const Post = require('../models/Post') 


const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()

    return res.send(posts)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
  
})

router.get('/:id', getPost, async (req, res) => {
  
  res.json(res.post)
})

router.get('/:userId', getPostUserId, async (req, res) => {
  
  res.json(res.postUser)
})

router.post('/', async (req, res) => {
  
  const post = new Post({
    userId: req.body.userId,
    conteudo: req.body.conteudo,
    foto: req.body.foto,
    status: req.body.status,
  })

  try {
    const created = await post.save()

    res.status(201).json(created)
  } catch (error) {
    res.status(400).json({message: error.message})
  }

})

router.put('/:id', getPost, async (req, res) => {
  if (req.body.userId != null) {
    res.post.userId = req.body.userId
  }
  if (req.body.conteudo != null) {
    res.post.conteudo = req.body.conteudo
  }
  if (req.body.foto != null) {
    res.post.foto = req.body.foto
  }  
  if (req.body.status != null) {
    res.post.status = req.body.status
  }

  try {
    const update = await res.post.save()

    res.json(update)
  } catch (error) {
    res.status(400).json({message: err.message})
  }

})

router.delete('/:id', getPost, async (req, res) => {

  try {
    await res.post.remove()

    res.json({message: 'Post deletado com sucesso'})
  } catch (error) {
    res.status(500).json({message: err.message})
  }
})

//Publicar
router.patch('/:id', getPost, async (req, res) => {
  if (req.body.status != null) {
    res.post.status = req.body.status
  }

  try {
    const update = await res.post.save()

    res.json(update)
  } catch (error) {
    res.status(400).json({message: err.message})
  }

})

// middleware
async function getPost(req, res, next) {
  let post
  try {
    post = await Post.findById(req.params.id)

    if (post == null) {
      return res.status(404).json({message: 'Post não encontrado'})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.post = post

  next()
}

async function getPostUserId(req, res, next) {
  let postUser =[]
  try {
    postUser = await Post.find(userId => userId == req.params.userId)

    if (postUser == null) {
      return res.status(404).json({message: 'Post não encontrado'})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.postUser = postUser

  next()
}

module.exports = router

