const getRequestData = async req => {
  return new Promise((resolve, reject) => {
    try {
      let body = []

      req.on('data', part => {
        body.push(part)
      })

      req.on('end', () => {
        body = Buffer.concat(body).toString()
        resolve(body)
      })
    } catch (error) {
      reject(error)
    }
  })
}
export default getRequestData
