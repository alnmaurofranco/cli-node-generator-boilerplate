const { NODE_PORT, NODE_URL } = process.env;

const port = NODE_PORT;
const baseUrl = NODE_URL;

module.exports = {
  port,
  baseUrl,
};
