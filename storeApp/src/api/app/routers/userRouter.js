import { userFunctions } from '../controllers/userController.js'
import getRequestData from '../getRequestData.js'

const userRouter = async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const userData = JSON.parse(await getRequestData(req))
    const data = await userFunctions.login(userData.email, userData.password)
    console.log(userData)
    res.setHeader('Authorization', 'Bearer ' + data)
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(
      JSON.stringify({
        data: data
      })
    )
  } else if (req.url == '/api/user/register' && req.method == 'POST') {
    const userJson = await getRequestData(req)
    console.log(userJson)
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(JSON.stringify({ data: await userFunctions.register(userJson) }))
  } else if (
    req.url.match(
      /\/api\/user\/confirm\/eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/]*/
    ) &&
    req.method == 'GET'
  ) {
    const token = req.url.slice(req.url.lastIndexOf('/') + 1)
    console.log(token)
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(
      JSON.stringify({
        data: { token: token, msg: await userFunctions.verify(token) }
      })
    )
  } else if (req.url == '/api/user/logout' && req.method == 'POST') {
    //usun tokena ze store ( jak juz wreszcie zrobisz klienta dzbanie )
  }
}
export { userRouter }
