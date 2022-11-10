const http = require("http")
const https = require("https")
const url = require("url")

const server = http.createServer((req, res) => {
  const data = []
  let dataAsStr = ""
  https.get(req.url.slice(req.url.indexOf('=') + 1), (urlRes) => {
    // urlRes.on("data", (chunk) => {
    //   data.push(chunk)
    // })
    // urlRes.on("end", () => {
    //   dataAsStr = Buffer.concat(data).toString()
    //   res.writeHead(200)
    //   res.write(dataAsStr)
    //   res.end()
    // })
    urlRes.pipe(res);
  })
  
})

server.listen(9000, () => {
  console.log("server running on port 9000")
})
