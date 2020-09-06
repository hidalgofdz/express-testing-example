const MovieFactory = require('../factories/movies');
const {Movie} = require('../models');
const {getTestClient} = require("../tests/request-client-utils");

describe("Movies CRUD", () => {
    async function setup(){
        return {testClient: getTestClient()};
    }

    test("POST /Movies - Success", async () => {
        const {testClient} = await setup();
        const response = await testClient.post('/movies', {
            title: "Some movie",
            description: "Some description"
        })

        expect(response.status).toBe(201);
        expect(response.data).toStrictEqual({
            id: expect.any(Number),
            title: "Some movie",
            description: "Some description",
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        })
    })

    test("GET /Movies - Success", async () => {
        const movie = MovieFactory.build({
            title: "Some movie",
            description: "Some description"
        });
        Movie.create(movie);

        const {testClient} = await setup();
        const response = await testClient.get("/movies");

        expect(response.status).toBe(200);
        expect(response.data).toStrictEqual([
                {
                    id: expect.any(Number),
                    title: "Some movie",
                    description: "Some description",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                }
            ]
        )
    })
})
