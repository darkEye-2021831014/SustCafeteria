import express from "express"
import cors from "cors"
import home from "./controllers/home.js"
import user from "./routes/user.js"
import { verifyUser } from "./middlewares/auth.js"


const app = express();

app.use(cors());
app.use(express.json());
app.use(verifyUser);

app.get("/", home)

app.use("/user", user);

export default app;