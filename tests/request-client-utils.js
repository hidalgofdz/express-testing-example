const axios = require("axios");
const getData = (res) => res;

const handleRequestFailure = ({ response: { status, data } }) => {
  const error = new Error(`${status}: ${JSON.stringify(data)}`);
  // remove parts of the stack trace so the error message (codeframe) shows up
  // at the code where the actual problem is.
  error.stack = error.stack
    .split("\n")
    .filter(
      (line) =>
        !line.includes("at handleRequestFailure") &&
        !line.includes("at processTicksAndRejections")
    )
    .join("\n");
  error.status = status;
  error.data = data;
  return Promise.reject(error);
};

const resolve = (e) => e;

function getTestClient({
  baseURL = `${process.env.HOSTNAME}:${process.env.PORT}`,
} = {}) {
  const testClient = axios.create({ baseURL });
  testClient.interceptors.response.use(getData, handleRequestFailure);
  return testClient;
}

module.exports = { getData, handleRequestFailure, resolve, getTestClient };
