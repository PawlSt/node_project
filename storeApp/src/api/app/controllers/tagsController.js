import { photosJson, tags } from '../model.js'
const jsonedTags = []
const tagsFunctions = {
  jsoningTags: () => {
    let id = 0
    if (jsonedTags.length == 0) {
      tags.map(tag => {
        jsonedTags.push({
          id: id,
          name: tag,
          popularity: Math.ceil(Math.random() * 10000)
        })
        id++
      })
    }
    return jsonedTags
  },
  getTags: () => {
    return tags
  },
  getOneTag: id => {
    if (jsonedTags.find(tag => tag.id == id) != undefined) {
      return jsonedTags.find(tag => tag.id == id)
    } else {
      return 'No tag has been found.'
    }
  },
  addTag: tagToAdd => {
    const id = jsonedTags[jsonedTags.length - 1].id + 1
    const name = tagToAdd.name
    const popularity = tagToAdd.popularity
    console.log(id, name, popularity)
    if (tags.find(tag => tag == name) == undefined) {
      jsonedTags.push({
        id: id,
        name: name,
        popularity: popularity
      })
      tags.push(name)
      return jsonedTags[jsonedTags.length - 1]
    } else {
      return 'Tag with this name already exists!'
    }
  },
  addTags: (tagsToAdd, photoId) => {
    let requiredPhoto = photosJson.find(photo => photo.id == photoId)
    if (requiredPhoto) {
      tagsToAdd.forEach(element => {
        requiredPhoto.tags.push(element)
      })
      requiredPhoto.lastChange = 'tags added'
      if (requiredPhoto.history.length > 1) {
        requiredPhoto.history.push({
          status: 'modified ' + requiredPhoto.history.length + ' times',
          lastModifiedDate: new Date().getTime()
        })
      } else {
        requiredPhoto.history.push({
          status: 'modified ' + requiredPhoto.history.length + ' time',
          lastModifiedDate: new Date().getTime()
        })
      }
      console.log('tags to add: ' + tagsToAdd, 'photo id: ' + photoId)
      console.log('required photo: ' + requiredPhoto)
      return requiredPhoto
    } else {
      return 'Photo not found!'
    }
  }
}
export { tagsFunctions, jsonedTags }
