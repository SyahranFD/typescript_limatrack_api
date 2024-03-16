import {logger} from "../../src/application/logging";
import supertest from "supertest";
import {web} from "../../src/application/web";
import {PedagangTest} from "../pedagang/pedagang-util-test";
import {JajananTest} from "./jajanan-util-test";

describe('POST /api/jajanan', () => {
    beforeEach(async () => {
        await PedagangTest.create();
    })

    afterEach(async () => {
        await JajananTest.delete();
        await PedagangTest.delete();
    })

    it('should be able to create jajanan', async () => {
        // Arrange
        const request = {
            nama: "Batagor",
            harga: 10000,
            image: "batagor.jpg",
            tersedia: true,
            kategori: "Jajanan Utama"
        }

        // Action
        const response = await supertest(web)
            .post("/api/jajanan")
            .set("X-API-TOKEN", "token-1")
            .send(request);

        // Assert
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.nama).toBe("Batagor");
        expect(response.body.data.harga).toBe(10000);
        expect(response.body.data.image).toBe("batagor.jpg");
        expect(response.body.data.tersedia).toBe(true);
        expect(response.body.data.kategori).toBe("Jajanan Utama");
    })
})

describe('GET /api/jajanan/:jajananId', () => {
    beforeEach(async () => {
        await PedagangTest.create();
        await JajananTest.create();
    })

    afterEach(async () => {
        await JajananTest.delete();
        await PedagangTest.delete();
    })

    it('should be able to get jajanan', async () => {
        // Arrange
        const jajananId = "jajanan-1";

        // Action
        const response = await supertest(web)
            .get(`/api/jajanan/${jajananId}`)
            .set("X-API-TOKEN", "token-1");

        // Assert
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe("jajanan-1");
        expect(response.body.data.nama).toBe("Batagor");
        expect(response.body.data.harga).toBe(10000);
        expect(response.body.data.image).toBe("batagor.jpg");
        expect(response.body.data.tersedia).toBe(true);
        expect(response.body.data.kategori).toBe("Jajanan Utama");
    });
});

describe('PUT /api/jajanan/:jajananId', () => {
    beforeEach(async () => {
        await PedagangTest.create();
        await JajananTest.create();
    })

    afterEach(async () => {
        await JajananTest.delete();
        await PedagangTest.delete();
    })

    it('should be able to update jajanan', async () => {
        // Arrange
        const request = {
            id: "jajanan-1",
            pedagang_id: "pedagang-1",
            nama: "Batagor",
            harga: 15000,
            image: "batagor-spesial.jpg",
            tersedia: true,
            kategori: "Jajanan Spesial"
        }

        const jajananId = "jajanan-1";

        // Action
        const response = await supertest(web)
            .put(`/api/jajanan/${jajananId}`)
            .set("X-API-TOKEN", "token-1")
            .send(request);

        // Assert
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe("jajanan-1");
        expect(response.body.data.nama).toBe("Batagor");
        expect(response.body.data.harga).toBe(15000);
        expect(response.body.data.image).toBe("batagor-spesial.jpg");
        expect(response.body.data.tersedia).toBe(true);
        expect(response.body.data.kategori).toBe("Jajanan Spesial");
    });
});

describe('DELETE /api/jajanan/:jajananId', () => {
beforeEach(async () => {
        await PedagangTest.create();
        await JajananTest.create();
    })

    afterEach(async () => {
        await JajananTest.delete();
        await PedagangTest.delete();
    })

    it('should be able to delete jajanan', async () => {
        // Arrange
        const jajananId = "jajanan-1";

        // Action
        const response = await supertest(web)
            .delete(`/api/jajanan/${jajananId}`)
            .set("X-API-TOKEN", "token-1");

        // Assert
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("Jajanan berhasil dihapus");
    });
})
