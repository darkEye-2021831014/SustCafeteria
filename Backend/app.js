import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import swaggerUi from "swagger-ui-express"
import home from "./controllers/home.js"
import { verifyUser } from "./middlewares/auth.js"
import inventory from "./routes/inventory.js"
import { upload } from "./middlewares/user.js"
import user from "./routes/user.js"
import supplier from "./routes/supplier.js"
import itemSupplier from "./routes/item_supplier.js"
import purchaseOrder from "./routes/purchase_order.js"
import SwaggerParser from "@apidevtools/swagger-parser"

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(upload.single("image"));
app.use(verifyUser);

app.get("/", home);
app.use("/user", user);
app.use("/inventory", inventory);
app.use("/supplier", supplier);
app.use("/item-supplier", itemSupplier);
app.use("/purchase-order", purchaseOrder);
app.use("/uploads", express.static("uploads"));


async function setupSwagger() {
    const api = await SwaggerParser.dereference("./docs/openapi.yaml");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(api));
}
setupSwagger();


export default app;