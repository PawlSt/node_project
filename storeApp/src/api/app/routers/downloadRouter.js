import { downloadFunctions } from "../controllers/downloadController.js"
import fs from "fs"
const downloadRouter = async (req, res) => {
  if (req.url.match(/\/api\/getimage\/([0-9]+)$/) && req.method == 'GET') {
    const url = req.url.slice(req.url.lastIndexOf('/') + 1)
    const photoUrl = downloadFunctions.ogFileDownload(url)
    if (photoUrl == "nophoto") {
      res.writeHead(200, { 'Content-type': 'text/plain' })
      res.end(JSON.stringify({ data: "no daj ze zdjecie istniejace pls" }))
    } else {
      const ext = photoUrl.slice(photoUrl.lastIndexOf('.') + 1)
      res.writeHead(200, { 'Content-type': `image/${ext}` })
      res.end(fs.readFileSync(photoUrl))
    }
  } else if (
    req.url.match(/\/api\/getimage\/([0-9]+)\/filter\/([a-z]+)/) &&
    req.method == 'GET'
  ) {
    const url = req.url.split('/')[3]
    const filter = '-' + req.url.slice(req.url.lastIndexOf('/') + 1)
    console.log(url, filter)
    const photoUrl = downloadFunctions.filteredDownload(url, filter)
    if (photoUrl == 'nophoto') {
      res.writeHead(200, { 'Content-type': 'text/plain' })
      res.end(JSON.stringify({ data: 'daj ze istniejace zdjecie pls' }))
    } else {
      const ext = photoUrl.slice(photoUrl.lastIndexOf('.') + 1)
      res.writeHead(200, { 'Content-type': `image/${ext}` })
      res.end(fs.readFileSync(photoUrl))
    }
  }
}
export { downloadRouter }
