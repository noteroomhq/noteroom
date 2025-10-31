import express, { urlencoded } from "express";
import { config } from "./utils";
import WebRouter from "./routes/routes"

const app = express()
const port = config("app.port")

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use("/api", WebRouter())

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
