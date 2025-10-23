import jwt from "jsonwebtoken";
import { config } from "../../utils";
import { JWTUser } from "@types/users";

const jwtSecretToken = config("services.jwt.secret")

export function createJWTToken(user: JWTUser): string {
    return jwt.sign(user, jwtSecretToken as string)
}

export function verifyToken(token: string): JWTUser | null {
    try {
        const data = jwt.verify(token, jwtSecretToken as string)
        return data as JWTUser
    } catch (error) {
        return null
    }
}
