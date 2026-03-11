import express from "express"
import cors from "cors"
import home from "./controllers/home.js"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", home)

// app.use("/user")


export default app;