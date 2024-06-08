import jsonwebtoken from 'jsonwebtoken'
import formidable from 'formidable'
import path from 'path'
import fs from 'fs'
import { photosJson } from '../model.js'
const { sign, verify } = jsonwebtoken
const __dirname = path.resolve()
const uploadDir = path.join(__dirname, 'upload')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}
const profileFunctions = {
  getUserData: async token => {
    const verifyToken = token => {
      try {
        let decoded = verify(token, 'verysecretkey')
        return decoded
      } catch (ex) {
        return ex.message
      }
    }
    const userData = verifyToken(token)
    if (userData != false) {
      return userData
    } else {
      return 'cos sie nie zgadza'
    }
  },
  updateUserData: async (token, newData) => {
    const verifyToken = token => {
      try {
        let decoded = verify(token, 'verysecretkey')
        return decoded
      } catch (ex) {
        return ex.message
      }
    }
    let userData = verifyToken(token)
    if (typeof userData === 'object') {
      console.log(userData)

      // Create a new token with the updated user data
      const newToken = sign(
        {
          email: userData.email,
          name: newData.name,
          lastName: newData.lastName
        },
        'verysecretkey',
        { expiresIn: '3h' }
      )
      return { message: 'spoko naeraze', token: newToken }
    } else {
      return 'cos sie nie zgadza ZNOWU'
    }
  },
  updatePfp: (token, newPfp) => {
    const verifyToken = token => {
      try {
        let decoded = verify(token, 'verysecretkey')
        return decoded
      } catch (ex) {
        return ex.message
      }
    }
    let userData = verifyToken(token)
    const userAlbum = path.join(uploadDir, userData.email)
    if (typeof userData === 'object') {
      if (!fs.existsSync(userAlbum)) {
        fs.mkdirSync(userAlbum, { recursive: true })
      }
      const form = formidable({
        keepExtensions: true,
        uploadDir: userAlbum
      })
      form.parse(newPfp, function (err, fields, files) {
        if (err) {
          reject(err)
          return
        }
        const uploadedFile = files.file
        if (uploadedFile) {
          const filePath = path.join(userAlbum, 'profile.jpg')
          const OGName = 'profile.jpg'
          const newPhotoData = {
            id: Date.now(),
            album: fields.album || 'default',
            originalName: OGName,
            url: filePath,
            lastChange: 'original',
            history: [
              {
                status: 'original',
                lastModifiedDate: new Date().getTime()
              }
            ],
            tags: []
          }
          photosJson.push(newPhotoData)
          return newPhotoData
        } else {
          return 'File upload failed'
        }
      })

      return userData
    } else {
      return 'cos sie zjebao'
    }
  }
}

export { profileFunctions }
