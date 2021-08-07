require("dotenv").config()
const express = require("express")
const path = require("path")
const schedule = require("./routes/schedule")
const shows = require("./routes/shows")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/schedule", schedule)
app.use("/api/shows", shows)

const env = process.env.NODE_ENV || "development"

if (env.toLowerCase() == "production") {
  console.log("Running in Production Mode (using optimised build)")
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

const PORT = process.env.PORT || 6000

app.listen(PORT, console.log(`Server started on port ${PORT}`))