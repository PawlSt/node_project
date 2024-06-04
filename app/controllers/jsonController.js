import formidable from 'formidable'
import { photosJson } from '../model.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import path from 'path'
import fs from 'fs'
import { fileFunctions } from './fileController.js'

const __dirname = path.resolve()
const uploadDir = path.join(__dirname, 'upload')
console.log(uploadDir)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const JCFunctions = {
  add: async newPhoto => {
    console.log('add')
    return new Promise((resolve, reject) => {
      try {
        const form = formidable({
          keepExtensions: true,
          uploadDir: uploadDir
        })

        form.parse(newPhoto, function (err, fields, files) {
          if (err) {
            reject(err)
            return
          }

          //informacje
          const uploadedFile = files.file
          if (uploadedFile) {
            const filePath = uploadedFile.path
            const OGName = uploadedFile.name
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
            resolve(newPhotoData)
          } else {
            reject(new Error('File upload failed'))
          }
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  delete: adres => {
    console.log('delete')

    fileFunctions.delete(adres)
    const photoIndex = photosJson.findIndex(photo => photo.id == adres)
    if (photoIndex > -1) {
      console.log('usuwam foto o id: ', adres)
      return photosJson.splice(photoIndex, 1)
    } else {
      console.log('photo not found')
    }
  },
  patch: adres => {
    console.log('patch')
    console.log(adres.id)

    const photoToPatch = photosJson.find(photo => photo.id == adres.id)
    let status
    if (photoToPatch.history.length == 1) {
      status = `modified ${photoToPatch.history.length} time`
    } else {
      status = `modified ${photoToPatch.history.length} times`
    }
    photoToPatch.history.push({
      status: status,
      lastModifiedDate: new Date().getTime()
    })
    photoToPatch.lastChange =
      photoToPatch.history[photoToPatch.history.length - 1].status

    console.log(
      photoToPatch.history,
      photoToPatch.history.length,
      photoToPatch.history
    )
    return photoToPatch.id
  }
}

export { JCFunctions }
