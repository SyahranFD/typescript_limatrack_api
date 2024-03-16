import supertest from "supertest";
import {UserTest} from "./user-test-util";
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";
import {OtpTest} from "./otp-util-test";

describe('POST /api/users/register', () => {

    afterEach(async () => {
        await UserTest.delete();
        // await OtpTest.delete();
    })

    it('should reject register new user if request is invalid', async () => {
        const response = await supertest(web)
            .post("/api/users/register")
            .send({
                nama_lengkap: "",
                email: "",
                password: ""
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject register new user if email is already registered', async () => {
        await UserTest.create();

        const response = await supertest(web)
            .post("/api/users/register")
            .send({
                nama_lengkap: "Rafa Syahran",
                email: "fadhilrafa1@gmail.com",
                password: "rafapass"
            });

        logger.debug(response.body);
        expect(response.status).toBe(409);
        expect(response.body.errors).toBeDefined();
    });

    it('should register new user', async () => {
        await OtpTest.create();

        const response = await supertest(web)
            .post("/api/users/register")
            .send({
                nama_lengkap: "Rafa Syahran",
                email: "fadhilrafa1@gmail.com",
                password: "rafapass",
                otp: "123456"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.nama_lengkap).toBe("Rafa Syahran");
        expect(response.body.data.email).toBe("fadhilrafa1@gmail.com");
    });

});

describe('POST /api/users/login', () => {

    beforeEach(async () => {
        await UserTest.create();
    })

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should reject login if email is wrong', async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                email: "wrong@gmail.com",
                password: "rafapass"
            });

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject login if email is wrong', async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                email: "fadhilrafa1@gmail.com",
                password: "wrongpass"
            });

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it('should be able to login', async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                email: "fadhilrafa1@gmail.com",
                password: "rafapass",
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.nama_lengkap).toBe("Rafa Syahran");
        expect(response.body.data.email).toBe("fadhilrafa1@gmail.com");
        expect(response.body.data.token).toBeDefined();
    });
});

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it('should be able to get user', async () => {
        const response = await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "token-1");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.nama_lengkap).toBe("Rafa Syahran");
        expect(response.body.data.email).toBe("fadhilrafa1@gmail.com");
    });

    it('should reject get user if token is invalid', async () => {
        const response = await supertest(web)
            .get("/api/users/current")
            .set("X-API-TOKEN", "salah");

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});

describe('PUT /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    afterAll(async () => {
        await UserTest.delete();
    });

    it('should be able to update user', async () => {
        const response = await supertest(web)
            .put("/api/users/current")
            .set("X-API-TOKEN", "token-1")
            .send({
                nama_lengkap: "Rafa Syahra",
                email: "fadhilrafa1@gmail.com",
                password: "rafapass",
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.nama_lengkap).toBe("Rafa Syahra");
        expect(response.body.data.email).toBe("fadhilrafa1@gmail.com");
    });
});

describe('DELETE /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it('should be able to logout', async () => {
        const response = await supertest(web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "token-1");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("Berhasil Logout");
    });
});
