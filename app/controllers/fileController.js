//importy
import { photos } from '../model.js'
import formidable from 'formidable'
import { photosJson } from '../model.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import { error } from 'console'

// stałe
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//funkcje
const fileFunctions = {
  add: () => {},
  delete: adres => {
    const photoToDelete = photosJson.find(element => element.id == adres)
    if (photoToDelete) {
      console.log('zdjecie do usuniecia: ', photoToDelete)
      fs.rm(photoToDelete.url, err => {
        if (err) {
          console.log(err)
        }
      })
    } else {
      console.log('photo not found')
    }
  }
}
export { fileFunctions }
