import { createServer } from 'http'
import imageRouter from './app/routers/imageRouter.js'
import { downloadRouter } from './app/routers/downloadRouter.js'
import { filtersRouter } from './app/routers/filtersRouter.js'
import { tagsRouter } from './app/routers/tagsRouter.js'
import { userRouter } from './app/routers/userRouter.js'
import { profileRouter } from './app/routers/profileRouter.js'
import formidable from 'formidable'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as http from 'http'
import 'dotenv/config'
import axios from 'axios'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PORT = 7000
const server = http
  .createServer(async (req, res) => {
    //images
    if (req.url.search('/api/photos') != -1) {
      await imageRouter(req, res)
    }

    //tags router
    else if (req.url.search('/api/tags') != -1) {
      await tagsRouter(req, res)
    }

    //filters router
    else if (req.url.search('/api/filters') != -1) {
      await filtersRouter(req, res)
    }

    //download router
    else if (req.url.search('/api/getimage') != -1) {
      await downloadRouter(req, res)
    }

    //users router
    else if (req.url.search('/api/user') != -1) {
      await userRouter(req, res)
    }

    //profile router
    else if (req.url.search('/api/profile') != -1) {
      await profileRouter(req, res)
    }
  })
  .listen(process.env.APP_PORT, () =>
    console.log('listen on ' + process.env.APP_PORT)
  )

//get
const get = async url => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(url)
        console.log('axios', response.data)
        resolve(response.data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    }, 500 + Math.random() * 1000)
  })
}
//post
const post = async url => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.post(url)
        console.log('axios', response.data)
        resolve(response.data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    }, 500 + Math.random() * 1000)
  })
}
//patch
const patch = async url => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.patch(url)
        console.log('axios', response.data)
        resolve(response.data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    }, 500 + Math.random() * 1000)
  })
}
const del = async url => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.delete(url)
        console.log('axios', response.data)
        resolve(response.data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    }, 500 + Math.random() * 1000)
  })
}

//functions
const postImage = () => post('http://localhost:7000/api/photos')
const getImages = () => get('http://localhost:7000/api/photos')
const getImage = () => get('http://localhost:7000/api/photos/1716408938532')
const deleteImage = () => del('http://localhost:7000/api/photos/1716395937928')
const updateImage = () => patch('http://localhost:7000/api/photos')
const updateTagsImage = () =>
  patch('http://localhost:7000/api/photos/tags/mass')
const getTagsJson = () => get('http://localhost:7000/api/tags')
const getTags = () => get('http://localhost:7000/api/tags/raw')
const getTag = () => get('http://localhost:7000/api/tags/11')
const addTag = () => post('http://localhost:7000/api/tags')
const getTagsImage = () => get('http://localhost:7000/api/photos/tags/12345')
const getImageMeta = () => get('http://localhost:7000/api/filters/metadata/123')
const useFilter = () => patch('http://localhost:7000/api/filters')
const showImage = () => get('http://localhost:7000/api/getimage/1681671564412')
const showFilteredImage = () =>
  get('http://localhost:7000/api/getimage/1681671564412/filter/tint')
const register = () => post('http://localhost:7000/api/user/register')
const confirmRegister = () =>
  get(
    'http://localhost:7000/api/user/confirm/$2a$10$ODhAi4YY1F9neM3LJ8s/u.B7WSA9iPDRS8b3pQnc3JvOYprt8fH8C'
  )
const login = () => post('http://localhost:7000/api/user/login')
const logout = () => get('http://localhost:7000/api/user/logout')
const getUserData = () => get('http://localhost:7000/api/profile')
const updateUserData = () => patch('http://localhost:7000/api/profile')
const uploadPfp = () => post('http://localhost:7000/api/profile')

//exports
export {
  postImage,
  getImages,
  getImage,
  deleteImage,
  updateImage,
  updateTagsImage,
  getTagsJson,
  getTags,
  getTag,
  addTag,
  getTagsImage,
  getImageMeta,
  useFilter,
  showImage,
  showFilteredImage,
  register,
  confirmRegister,
  login,
  logout,
  getUserData,
  updateUserData,
  uploadPfp
}
