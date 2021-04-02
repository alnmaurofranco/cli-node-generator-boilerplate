const express = require('express');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (_req, res) => res.json({ message: 'Welcome to Generator NodeJS' }));

const port = process.env.PORT || 3333;

server.listen(port, () => console.log(`Server started on http://localhost:${port} ✨`));
