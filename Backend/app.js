import express from "express"
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({ msg: "Sust Cafeteria Backend!" });
})


export default app;