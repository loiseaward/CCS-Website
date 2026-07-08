//main backend file
import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();

const PORT = process.env.port || 8000; //can change later if needed

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Backend server is operational");
});

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});