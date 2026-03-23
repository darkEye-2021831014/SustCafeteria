import "dotenv/config"
import app from "./app.js"
import { setUpDB } from "./config/db.js";

setUpDB();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server Listening on port: ${PORT}`));