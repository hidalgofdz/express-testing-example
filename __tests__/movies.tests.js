const {getData, handleRequestFailure, resolve} = require("../tests/request-client-utils");

const startServer = require('../start');
const axios = require('axios');
let server;
beforeAll(async () => {
  server = await startServer();
})

afterAll(async () => {
  await server.close();
})

async function setup() {
  const testClient = axios.create({baseURL: "http://localhost:8080"});
  testClient.interceptors.response.use(getData, handleRequestFailure);
  return {testClient};
}

describe("Movies CRUD", () => {
  test("GET Movies - Success", async () => {

    const {testClient} = await setup();
    const what = await testClient.get("/movies");

    expect(what.status).toBe(200);
    expect(result.data).toBe([
        {
          id: expect.any('string'),
          title: "Some movie",
          description: "Some description"
        }
      ]
    )
  })
})
