import jsonwebtoken from 'jsonwebtoken'
const { sign, verify } = jsonwebtoken

const createToken = () => {
  let token = sign(
    {
      email: 'aaa@test.com',
      anyOtherData: '123'
    },
    'verysecretkey', // key powinien być zapisany w .env
    {
      expiresIn: '30s' // "1m", "1d", "24h"
    }
  )
  console.log({ token: token })
}
const verifyToken = token => {
  try {
    let decoded = verify(token, 'verysecretkey')
    console.log({ decoded: decoded })
  } catch (ex) {
    console.log({ message: ex.message })
  }
}

const processToken = () => {
  createToken()
  verifyToken(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYUB0ZXN0LmNvbSIsImFueU90aGVyRGF0YSI6IjEyMyIsImlhdCI6MTcxNzY3NDUyNywiZXhwIjoxNzE3Njc0NTU3fQ.TPdgvgAvVVmgDelcTzrNbMHYr_GuP8gHgN4MycJUmV4'
  )
}

processToken()
