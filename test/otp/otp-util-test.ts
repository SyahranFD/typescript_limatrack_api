import {prismaClient} from "../../src/application/database";

export class OtpTest {

    static async create() {
        await prismaClient.otp.create({
            data: {
                id: "otp-1",
                email: "fadhilrafa1@gmail.com",
                otp: "123456"
            }
        })
    }
    static async delete () {
        await prismaClient.otp.deleteMany({
            where: {
                email: "fadhilrafa1@gmail.com"
            }
        })
    }
}
