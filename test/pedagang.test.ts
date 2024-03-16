import supertest from "supertest";
import {web} from "../src/application/web";
import {PedagangTest} from "./pedagang-util-test";
import {logger} from "../src/application/logging";
import {OtpTest} from "./otp-util-test";
import {UserTest} from "./user-test-util";

describe('POST /api/pedagang/register', () => {

    afterEach(async () => {
        await PedagangTest.delete();
        await OtpTest.delete();
    });

    it('should be able to register pedagang', async () => {
        await OtpTest.create();

        const response = await supertest(web)
            .post("/api/pedagang/register")
            .send({
                email: "fadhilrafa1@gmail.com",
                password: "rafapass",
                nama_warung: "Warung Rafa",
                nama_pedagang: "Rafa Syahran",
                image: "image-1",
                status: "Buka",
                jam_buka: "08:00",
                jam_tutup: "17:00",
                daerah_dagang: "Jakarta",
                rating: 4.5,
                sertifikasi_halal: true,
                latitude: "-6.753575877006632",
                longitude: "110.84286600359306",
                otp: "123456"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.email).toBe("fadhilrafa1@gmail.com");
        expect(response.body.data.nama_warung).toBe("Warung Rafa");
        expect(response.body.data.nama_pedagang).toBe("Rafa Syahran");
        expect(response.body.data.image).toBe("image-1");
        expect(response.body.data.status).toBe("Buka");
        expect(response.body.data.jam_buka).toBe("08:00");
        expect(response.body.data.jam_tutup).toBe("17:00");
        expect(response.body.data.daerah_dagang).toBe("Jakarta");
        expect(response.body.data.rating).toBe(4.5);
        expect(response.body.data.sertifikasi_halal).toBe(true);
        expect(response.body.data.latitude).toBe("-6.753575877006632");
        expect(response.body.data.longitude).toBe("110.84286600359306");
    });
})

describe('POST /api/pedagang/login', () => {
    beforeEach(async () => {
        await PedagangTest.create();
    })

    afterEach(async () => {
        await PedagangTest.delete();
    })

    it('should be able to login pedagang', async () => {
        const response = await supertest(web)
            .post("/api/pedagang/login")
            .send({
                email: "fadhilrafa1@gmail.com",
                password: "rafapass"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();
    });
})

describe('GET /api/pedagang', () => {
    beforeEach(async () => {
        await PedagangTest.create();
    })

    afterEach(async () => {
        await PedagangTest.delete();
    })

    it('should be able to get pedagang', async () => {
        const response = await supertest(web)
            .get("/api/pedagang");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
    });
});

describe('GET /api/pedagang/current', () => {
    beforeEach(async () => {
        await PedagangTest.create();
    })

    afterEach(async () => {
        await PedagangTest.delete();
    })

    it('should be able to get current pedagang', async () => {
        const response = await supertest(web)
            .get("/api/pedagang/current")
            .set("X-API-TOKEN", "token-1");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.email).toBe("fadhilrafa1@gmail.com");
        expect(response.body.data.nama_warung).toBe("Warung Rafa");
        expect(response.body.data.nama_pedagang).toBe("Rafa Syahran");
        expect(response.body.data.image).toBe("image-1");
        expect(response.body.data.status).toBe("Buka");
        expect(response.body.data.jam_buka).toBe("08:00");
        expect(response.body.data.jam_tutup).toBe("17:00");
        expect(response.body.data.daerah_dagang).toBe("Jakarta");
        expect(response.body.data.rating).toBe(4.5);
        expect(response.body.data.sertifikasi_halal).toBe(true);
        expect(response.body.data.latitude).toBe("-6.753575877006632");
        expect(response.body.data.longitude).toBe("110.84286600359306");
    });
})

describe('DELETE /api/pedagang/current', () => {
    beforeEach(async () => {
        await PedagangTest.create();
    });

    afterEach(async () => {
        await PedagangTest.delete();
    });

    it('should be able to logout', async () => {
        const response = await supertest(web)
            .delete("/api/pedagang/current")
            .set("X-API-TOKEN", "token-1");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("Berhasil Logout");
    });
});
