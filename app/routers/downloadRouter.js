const downloadRouter = async (req, res) => {
  if (req.url.match(/\/api\/getimage\/([0-9]+)$/) && req.method == 'GET') {
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end(JSON.stringify({ data: 'dupsko na zwykly download' }))
  } else if (
    req.url.match(/\/api\/getimage\/([0-9]+)\/filter\/([a-z]+)/) &&
    req.method == 'GET'
  ) {
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end(JSON.stringify({ data: 'dupsko na download z filtrem' }))
  }
}
export { downloadRouter }
