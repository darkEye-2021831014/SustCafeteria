import "dotenv/config"
import app from "./app.js"
import { testDB } from "./config/db.js";

testDB();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server Listening on port: ${PORT}`));