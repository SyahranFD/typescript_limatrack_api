import {logger} from "../../src/application/logging";
import {web} from "../../src/application/web";
import supertest from "supertest";
import {OtpTest} from "./otp-util-test";

describe('POST /api/otp/user', () => {

    afterEach(async () => {
        await OtpTest.delete();
    });

    it('should be able to send otp user', async () => {
        const response = await supertest(web)
            .post("/api/otp/user")
            .send({
                email: "fadhilrafa1@gmail.com"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe("fadhilrafa1@gmail.com");
        expect(response.body.data.otp).toBeDefined();
    })
})

describe('POST /api/otp/pedagang', () => {

    afterEach(async () => {
        await OtpTest.delete();
    });

    it('should be able to send otp user', async () => {
        const response = await supertest(web)
            .post("/api/otp/pedagang")
            .send({
                email: "fadhilrafa1@gmail.com"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe("fadhilrafa1@gmail.com");
        expect(response.body.data.otp).toBeDefined();
    })
})
