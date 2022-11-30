const express = require("express")

const app = express()
const port = 777

app.use(express.json())

let currEventId = 0
let currGuestId = 0
const events = new Map()

app.post("/event", (req, res) => {
  const { body } = req
  events.set(currEventId++, {...body, guests: new Map()})
  res.send(body)
})

app.get("/event/:id", (req, res) => {
  const { id } = req.params
  res.send(events.get(+id))
})

app.get("/events", (_req, res) => {
  res.send([...events])
})

app.delete("/event/:id", (req, res) => {
  const { id } = req.params
  res.send(events.delete(+id))
})

app.post("/event/:id/booking", (req,res) => {
    const { body } = req
    const { id } = req.params
    const event = events.get(+id)
    
    if(event.capacity <= 0) {
        res.status = 401;
        res.send('Capacity exceeded for event.')
    }

    event.guests.set(currGuestId++,body)
    console.log(event,event.guests)
    res.send(`Remaining capacity: ${--event.capacity}`)
})

app.get("/event/:id/booking", (req,res) => {
    const { id } = req.params
    res.send([...events.get(+id).guests])
})

app.get("/event/:id/booking/:bookingId", (req, res) => {
    const { id, bookingId } = req.params
    res.send(events.get(+id).guests.get(+bookingId))
})

app.delete("/event/:id/booking/:bookingId", (req,res) => {
    const { id, bookingId } = req.params
    res.send(events.get(+id).guests.delete(+bookingId))
})

app.listen(port, () => console.log(`server up on port ${port}`))
