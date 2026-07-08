//main backend file

const express = require('express');

const app = express();

const PORT = process.env.port || 3000; //can change later if needed

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Backend server is operational");
});

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});