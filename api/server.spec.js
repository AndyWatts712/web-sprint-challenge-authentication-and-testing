const supertest = require("supertest")

const server = require("./server.js")
const db = require("../database/dbConfig.js")

describe('POST /auth', () => {
    beforeEach(async () => {
        await db("users").truncate();
    });
    it("/register should return 400 when passed bad data", () => {
            return supertest(server)
                .post("/api/auth/register")
                .send({ user: "user", pass: "password" })
                .then(res => {
                    expect(res.status).toBe(400);
                });
        })

    it("/register should return 201 when passed correct data", () => {
        return supertest(server)
            .post("/api/auth/register")
            .send({ username: "radmosol", password: "password" })
            .then(res => {
                expect(res.status).toBe(201);
            });
    });

    it("/login should return 200 when passed correct data", () => {
        return supertest(server)
            .post("/api/auth/login")
            .send({ username: "radmosol", password: "password" })
            .then(res => {
                expect(res.status).toBe(200);
            });
    });

    
    it("/login should return 401 when passed bad creds", () => {
        return supertest(server)
            .post("/api/auth/login")
            .send({ username: "radmosol", password: "wrongpassword" })
            .then(res => {
                expect(res.status).toBe(401);
            });
    })
})

describe('GET /jokes', () => {
    it("should return 401 if not logged in", async () => {
        const res = await supertest(server).get("/api/jokes")
            expect(res.body).toEqual({message: "No token!"})
    })

    it("should return jokes if logged in", async () => {
        const res = await supertest(server).get("/api/jokes")
            expect(res.body.joke).toBe(true)
    })
})