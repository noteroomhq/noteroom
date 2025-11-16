const { Command } = require("commander")
const { randomBytes } = require("crypto")
const { appendFile } = require("fs")

const app = new Command()

app.name("hey").description("Does some automatic configs for you!")

app
    .command("jwt:token")
    .description("Creates a random base64 secret token and appends in the .env file")
    .action(() => {
        const token = randomBytes(60).toString("base64")
        appendFile("./.env", `\nJWT_SECRET=${token}`, (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log(`Token created: ${token}`)
            }
        })
    })

app.parse(process.argv)