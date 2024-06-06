import bcryptjs from 'bcryptjs'
import { users } from '../model.js'
import jsonwebtoken from 'jsonwebtoken'
const { sign, verify } = jsonwebtoken
const { hash, compare } = bcryptjs
const userFunctions = {
  register: async data => {
    const jData = JSON.parse(data)
    let registeredUser
    let message = ''
    if (!jData.name) {
      message += ' name missing!'
    } else if (message == '') {
      message += 'user registered correctly!'
    }
    if (!jData.lastName) {
      message += ' last name missing!'
    } else if (message == '') {
      message += 'user registered correctly!'
    }
    if (!jData.email) {
      message += ' mail missing!'
    } else if (message == '') {
      message += 'user registered correctly!'
    }
    if (!jData.password) {
      message += ' password missing!'
    } else if (message == '') {
      message += 'user registered correctly!'
    }

    if (message == 'user registered correctly!') {
      const encryptPass = async password => {
        let encryptedPassword = await hash(password, 10)
        console.log({ encryptedPassword: encryptedPassword })
        return encryptedPassword
      }
      registeredUser = {
        id: new Date().getTime(),
        name: jData.name,
        lastName: jData.lastName,
        email: jData.email,
        confirmed: false,
        password: await encryptPass(jData.password)
      }
      users.push(registeredUser)
      console.log(registeredUser)
      const createToken = () => {
        let token = sign(
          {
            email: jData.email,
            name: jData.name,
            lastName: jData.lastName
          },
          'verysecretkey',
          {
            expiresIn: '30s' //"30s", "1m", "1d", "24h"
          }
        )
        console.log({ token: token })
        return token
      }
      message =
        'skopiuj poniższy link do przeglądarki http://localhost:7000/api/user/confirm/' +
        createToken() +
        ' w celu potwierdzenia konta Uwaga: link jest ważny przez godzinę'
    }
    return message
  },

  verify: async token => {
    try {
      let decoded = verify(token, 'verysecretkey')
      console.log({ decoded: decoded })
      const verifiedUser = users.find(user => user.email == decoded.email)
      console.log(verifiedUser.confirmed)
      verifiedUser.confirmed = true
      console.log(verifiedUser.confirmed)
      return { message: `valid token fajen ${decoded}` }
    } catch (ex) {
      console.log({ message: ex.message })
      return 'dupa sie zjebalo nie ma valid token'
    }
  },
  login: async (login, pass) => {
    const loggingUser = users.find(user => user.email == login)
    const decryptPass = async (userpass, encrypted) => {
      let decrypted = await compare(userpass, encrypted)
      return decrypted
    }
    if ((await decryptPass(pass, loggingUser.password)) == true) {
      const createToken = () => {
        let token = sign(
          {
            email: login,
            name: loggingUser.name,
            lastName: loggingUser.lastName
          },
          'verysecretkey',
          {
            expiresIn: '3h' //"30s", "1m", "1d", "24h"
          }
        )
        console.log({ token: token })
        return token
      }
      const logToken = createToken()
      return logToken
    } else {
      return 'login niefajen'
    }
  }
}
export { userFunctions }
