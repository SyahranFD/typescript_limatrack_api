import {prismaClient} from "../../src/application/database";
import bcrypt from "bcrypt";
import {User} from "@prisma/client";

export class UserTest {

    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                nama_lengkap: "Rafa Syahran"
            }
        })
    }

    static async create() {
        await prismaClient.user.create({
            data: {
                id: "user-1",
                nama_lengkap: "Rafa Syahran",
                email: "fadhilrafa1@gmail.com",
                password: await bcrypt.hash("rafapass", 10),
                token: "token-1",
            }
        })
    }

    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                nama_lengkap: "Rafa Syahran"
            }
        })

        if (!user) {
            throw new Error("User is not found");
        }

        return user;
    }

}
