import { profileFunctions } from '../controllers/profileController.js'
import getRequestData from '../getRequestData.js'

const profileRouter = async (req, res) => {
  if (req.url == '/api/profile' && req.method == 'GET') {
    const logToken = req.headers.authorization.split(' ')[1]
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(
      JSON.stringify({ data: await profileFunctions.getUserData(logToken) })
    )
  } else if (req.url == '/api/profile' && req.method == 'PATCH') {
    const logToken = req.headers.authorization.split(' ')[1]
    const newData = JSON.parse(await getRequestData(req))
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(
      JSON.stringify({
        message: 'good job u did it moron',
        data: await profileFunctions.updateUserData(logToken, newData)
      })
    )
  } else if (req.url == '/api/profile' && req.method == 'POST') {
    const logToken = req.headers.authorization.split(' ')[1]
    let newPfp = await profileFunctions.updatePfp(logToken, req)
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(
      JSON.stringify({
        message: 'pfp good congrats',
        data: newPfp
      })
    )
  }
}
export { profileRouter }
