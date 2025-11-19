const { Command } = require("commander")
const { randomBytes } = require("crypto")
const { appendFile, existsSync, mkdirSync, writeFile } = require("fs")
const { join } = require("path")

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

app
    .command("frontend:feature <name>")
    .action((name) => {
        const featureFolder = join('frontend/src/features', name)
        const folders = {
            components: join(featureFolder, 'components')
        }
        const files = {
            index: join(folders.components, 'index.tsx'),
            types: join(featureFolder, 'types.ts')
        }

        try {
            if (!existsSync(featureFolder)) {
                Object.keys(folders).forEach(folder => {
                    mkdirSync(folders[folder], { recursive: true })
                    console.log(`Folder created at ${folders[folder]}`)
                })

                Object.keys(files).forEach(file => {
                    writeFile(files[file], "", err => {
                        if (!err) {
                            console.log(`File created at ${files[file]}`)
                        } else {
                            console.log(`Couldn't create file at ${files[file]}`)
                            console.log(err)
                        }
                    })
                })
            } else {
                console.log(`Feature folder already exists`)
            }
        } catch (error) {
            console.log(`Couldn't initialize a feature at ${featureFolder}`)
            console.log(error)
        }
    })

app.parse(process.argv)