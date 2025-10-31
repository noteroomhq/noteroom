import { env } from "../utils"
export default {
    jwt: {
        secret: env("JWT_SECRET")
    }
}
