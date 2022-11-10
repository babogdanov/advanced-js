const http = require("http")

class Delivery {
  constructor(date, price) {
    this.date = date
    this.price = price
  }
}

const createResponse = (res, status, message) => {
  res.writeHead(status)
  res.write(message)
  res.end()
}

const delivery = new Delivery(new Date().toISOString(), 55)

const server = http.createServer((req, res) => {
  if (req.url.match(/\/load\/:[A-Za-z]+/)) {
    const prop = req.url.slice(req.url.indexOf(":") + 1)
    const propValue = delivery[prop]

    if (!propValue) {
      createResponse(res, 400, "Bad prop")
    } else {
      createResponse(res, 200, propValue.toString())
    }
  } else {
    createResponse(res, 400, "Bad endpoint")
  }
})

server.listen(9000, () => {
  console.log("server listening on port 9000")
})

const deliveryProxy = new Proxy(delivery, {
  get(target, prop, receiver) {
    const data = []
    let dataAsStr = ""
    const promise = new Promise((resolve, reject) => {
      http.get(`http://localhost:9000/load/:${prop}`, (res) => {
        res.on("data", (chunk) => {
          data.push(chunk)
        })
        res.on("end", () => {
          dataAsStr = Buffer.concat(data).toString()
          resolve(dataAsStr)
        })
        res.on("error", () => {
            console.log('err')
            reject()
        })
      })
    })

    promise.then(x => console.log(x))
  },
})

deliveryProxy.date
deliveryProxy.price
