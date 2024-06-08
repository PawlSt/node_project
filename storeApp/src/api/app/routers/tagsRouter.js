//importy
import { tags } from '../model.js'
import { tagsFunctions, jsonedTags } from '../controllers/tagsController.js'
import getRequestData from '../getRequestData.js'

const tagsRouter = async (req, res) => {
  tagsFunctions.jsoningTags()
  if (req.url == '/api/tags' && req.method == 'GET') {
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end(JSON.stringify({ data: tagsFunctions.jsoningTags() }))
  } else if (req.url == '/api/tags/raw' && req.method == 'GET') {
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end(JSON.stringify({ data: tagsFunctions.getTags() }))
  } else if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == 'GET') {
    const id = req.url.slice(req.url.lastIndexOf('/') + 1)
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end(JSON.stringify({ data: tagsFunctions.getOneTag(id) }))
  } else if (req.url == '/api/tags' && req.method == 'POST') {
    const tagToAdd = JSON.parse(await getRequestData(req))

    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end(JSON.stringify({ data: tagsFunctions.addTag(tagToAdd) }))
  }
}
export { tagsRouter }
