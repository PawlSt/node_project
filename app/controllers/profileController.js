import jsonwebtoken from 'jsonwebtoken'
const { sign, verify } = jsonwebtoken

const profileFunctions = {
  getUserData: async token => {
    const verifyToken = token => {
      try {
        let decoded = verify(token, 'verysecretkey')
        return decoded
      } catch (ex) {
        return ex.message
      }
    }
    const userData = verifyToken(token)
    if (userData != false) {
      return userData
    } else {
      return 'cos sie nie zgadza'
    }
  },
  updateUserData: async (token, newData) => {
    const verifyToken = token => {
      try {
        let decoded = verify(token, 'verysecretkey')
        return decoded
      } catch (ex) {
        return ex.message
      }
    }
    let userData = verifyToken(token)
    if (typeof userData === 'object') {
      console.log(userData)

      // Create a new token with the updated user data
      const newToken = sign(
        {
          email: userData.email,
          name: newData.name,
          lastName: newData.lastName
        },
        'verysecretkey',
        { expiresIn: '3h' }
      )
      return { message: 'spoko naeraze', token: newToken }
    } else {
      return 'cos sie nie zgadza ZNOWU'
    }
  }
}

export { profileFunctions }
