import bcryptjs from 'bcryptjs'
const { hash, compare } = bcryptjs
const pass = 'haselko'

const encryptPass = async password => {
  let encryptedPassword = await hash(password, 10)
  console.log({ encryptedPassword: encryptedPassword })
}

await encryptPass(pass)

const decryptPass = async (userpass, encrypted) => {
  let decrypted = await compare(userpass, encrypted)
  console.log({ decrypted: decrypted })
}

await decryptPass(
  pass,
  '$2a$10$WQ9nOCJZDwQlGN3OLFDbL.sTFQY.by9bayholpYMUhF4frzT7KRE2'
)
