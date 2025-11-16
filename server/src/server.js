import express from "express"

const port = 3000

const App = express()

App.get("/", (req, res) => {
    res.send("Checkly API is running.")
})

App.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})