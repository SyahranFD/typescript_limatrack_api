import {prismaClient} from "../../src/application/database";

export class JajananTest {
    static async create() {
        await prismaClient.jajanan.create({
            data: {
                id: "jajanan-1",
                pedagang_id: "pedagang-1",
                nama: "Batagor",
                harga: 10000,
                image: "batagor.jpg",
                tersedia: true,
                kategori: "Jajanan Utama"
            }
        })
    }
    static async delete() {
        await prismaClient.jajanan.deleteMany({
            where: {
                nama: "Batagor"
            }
        })
    }
}
