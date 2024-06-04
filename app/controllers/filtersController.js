import sharp from 'sharp'
import { photosJson } from '../model.js'
const filtersFunctions = {
  getMetadata: adres => {
    return new Promise(async (resolve, reject) => {
      try {
        let wantedPhoto = photosJson.find(photo => photo.id == adres)
        const imagePath = wantedPhoto.url
        console.log(imagePath)
        if (imagePath) {
          let meta = await sharp(imagePath).metadata()
          resolve(meta)
        } else {
          resolve('idk what the fuck really happened fr')
        }
      } catch (err) {
        console.log('dupa eror', err)
        reject(err.message)
      }
    })
  },
  applyFilters: async data => {
    let photoToChange = photosJson.find(photo => photo.id == data.id)
    let photoUrl = photoToChange.url
    let extensionIndex = photoUrl.lastIndexOf('.')
    const modifiedUrl =
      photoUrl.slice(0, extensionIndex) +
      '-' +
      data.lastChange +
      photoUrl.slice(extensionIndex)
    //applying filters
    switch (data.lastChange) {
      case 'negate':
        await sharp(photoToChange.url).negate().toFile(modifiedUrl)
        break
      case 'grayscale':
        await sharp(photoToChange.url).grayscale().toFile(modifiedUrl)
        break
      case 'extract':
        await sharp(photoToChange.url).extract().toFile(modifiedUrl)
        break
      case 'toFormat':
        await sharp(photoToChange.url).toFormat().toFile(modifiedUrl)
        break
      case 'resize':
        await sharp(photoToChange.url).resize().toFile(modifiedUrl)
        break
      case 'rotate':
        await sharp(photoToChange.url).rotate().toFile(modifiedUrl)
        break
      case 'flip':
        await sharp(photoToChange.url).flip().toFile(modifiedUrl)
        break
      case 'flop':
        await sharp(photoToChange.url).flop().toFile(modifiedUrl)
        break
      case 'tint':
        await sharp(photoToChange.url).tint().toFile(modifiedUrl)
        break
      default:
        break
    }

    console.log(modifiedUrl)
    photoToChange.history.push({
      status: data.lastChange,
      lastModifiedDate: new Date().getTime(),
      url: modifiedUrl
    })
    photoToChange.lastChange = data.lastChange
    return photoToChange
  }
}
export { filtersFunctions }
