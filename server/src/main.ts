import express from "express";
import { config } from "./utils";

const app = express()
const port = config("app.port")

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
