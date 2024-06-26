import {prismaClient} from "../../src/application/database";
import bcrypt from "bcrypt";

export class PedagangTest {
    static async create() {
        await prismaClient.pedagang.create({
            data: {
                id: "pedagang-1",
                email: "fadhilrafa1@gmail.com",
                password: await bcrypt.hash("rafapass", 10),
                token: "token-1",
                nama_warung: "Warung Rafa",
                nama_pedagang: "Rafa Syahran",
                image: "image-1",
                buka: true,
                jam_buka: "08:00",
                jam_tutup: "17:00",
                daerah_dagang: "Jakarta",
                rating: 4.5,
                sertifikasi_halal: true,
                latitude: "-6.753575877006632",
                longitude: "110.84286600359306",
            }
        })
    }

    static async delete() {
        await prismaClient.pedagang.deleteMany({
            where: {
                nama_warung: "Warung Rafa"
            }
        })
    }

    static async get() {
        const pedagang= await prismaClient.pedagang.findFirst({
            where: {
                nama_warung: "Warung Rafa"
            }
        })

        if (!pedagang) {
            throw new Error("Pedagang is not found");
        }

        return pedagang;
    }
}
