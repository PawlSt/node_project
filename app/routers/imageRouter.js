import { fileFunctions } from '../controllers/fileController.js'
import { JCFunctions } from '../controllers/jsonController.js'
import { tagsFunctions } from '../controllers/tagsController.js'
import getRequestData from '../getRequestData.js'
import { photos, photosJson } from '../model.js'

const imageRouter = async (req, res) => {
  //pobranie wszystkich tasków
  if (req.url == '/api/photos' && req.method == 'GET') {
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end(JSON.stringify({ data: photosJson }))
  }

  //pobranie jednego wg id
  else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == 'GET') {
    let url = req.url.split('/').pop()
    let data = photosJson.filter(photo => photo.id == url)
    if (data == '') {
      let message = 'photo with id ' + url + ' not found'
      res.writeHead(200, { 'Content-type': 'text/plain' })
      res.end(JSON.stringify({ message: message }))
    } else {
      res.writeHead(200, { 'Content-type': 'text/plain' })
      res.end(JSON.stringify({ data: data }))
    }
  }
  //utworzenie nowego taska
  else if (req.url == '/api/photos' && req.method == 'POST') {
    let newPhotoJson = await JCFunctions.add(req)
    console.log(newPhotoJson)
    // const data = await JCFunctions.add()
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end(JSON.stringify({ data: newPhotoJson }))
  }

  //usunięcie jednego taska wg id
  else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == 'DELETE') {
    const nophoto = photosJson.length
    let url = req.url.split('/').pop()
    const deletedPhoto = await JCFunctions.delete(url)
    if (nophoto == photosJson.length) {
      let message = 'photo with id ' + url + ' not found'
      res.writeHead(200, { 'Content-type': 'text/plain' })
      res.end(JSON.stringify({ message: message }))
    } else {
      let message = 'photo with id ' + url + ' deleted'
      res.writeHead(200, { 'Content-type': 'text/plain' })
      res.end(
        JSON.stringify({
          message: message
        })
      )
    }
  }
  //aktualizacja jednego taska wg id
  else if (req.url == '/api/photos' && req.method == 'PATCH') {
    const id = JSON.parse(await getRequestData(req))

    let message = `patched successfully; file patched: ${JCFunctions.patch(id)}`
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(JSON.stringify({ message: message }))
  } else if (req.url == '/api/photos/tags/mass' && req.method == 'PATCH') {
    const photoTagData = JSON.parse(await getRequestData(req))
    console.log(photoTagData.id)
    console.log(photoTagData.tags)

    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end(
      JSON.stringify({
        data: tagsFunctions.addTags(photoTagData.tags, photoTagData.id)
      })
    )
  }
}

export default imageRouter
