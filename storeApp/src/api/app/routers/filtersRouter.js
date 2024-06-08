import { filtersFunctions } from '../controllers/filtersController.js'
import getRequestData from '../getRequestData.js'

const filtersRouter = async (req, res) => {
  if (
    req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) &&
    req.method == 'GET'
  ) {
    let url = req.url.split('/').pop()

    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end(JSON.stringify({ data: await filtersFunctions.getMetadata(url) }))
  } else if (req.url.match(/\/api\/filters$/)) {
    const reqData = JSON.parse(await getRequestData(req))
    console.log(reqData)
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(
      JSON.stringify({
        data: await filtersFunctions.applyFilters(reqData)
      })
    )
  }
}

export { filtersRouter }
