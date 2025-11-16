import { config as dotenvConfig } from "dotenv";
import { join } from "path";

dotenvConfig({ path: join(__dirname, "../../.env") })


/**
* @param {string} key - ENV Key
* @param {unknown} default_ - Default ENV value
* @description - If `default_` is provided, all the errors will be suppressed and the default value will be returned
* @returns The env value
* @throws `Error` if there is no env key found in that path and no default values are provided
*/
export function env(key: string, default_?: unknown): unknown {
    const value = process.env[key]
    if (value) {
        return value
    } else {
        if (default_) {
            return default_
        } else {
            throw new Error(`Env key ${key} not found`)
        }
    }
}

/**
* @param {string} path - The path to the config
* @param {unknown} default_ - Default config value
* @description - If `default_` is provided, all the errors will be suppressed and the default config will be returned
* @returns The config value
* @throws `Error` if there is no config found in that `path` and no default values are provided
*/
export function config(path: string, default_?: unknown): unknown {
    try {
        const [configFile, ...rest] = path.split(".")
        const key = rest[rest.length - 1]
    
        let paths = rest.slice(0, rest.length - 1)
        let configs = require(`./config/${configFile}`).default
    
        while (paths.length !== 0) {
            configs = configs[paths[0]]
            paths.shift()
        }
    
        if (configs[key]) {
            return configs[key]
        } else {
            if (default_) {
                return default_
            }

            throw new Error(`No config found in ${path}`)
        }
    } catch (error) {
        if (default_) {
            return default_
        }
        throw new Error(`No config found in ${path}`)
    }
}
