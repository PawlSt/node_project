import { createServer } from 'http'
import imageRouter from './app/routers/imageRouter.js'
import { downloadRouter } from './app/routers/downloadRouter.js'
import { filtersRouter } from './app/routers/filtersRouter.js'
import { tagsRouter } from './app/routers/tagsRouter.js'
import formidable from 'formidable'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as http from 'http'

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
  })
  .listen(PORT, () => console.log('listen on ' + PORT))
