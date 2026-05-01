import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import swaggerUi from "swagger-ui-express"
import home from "./controllers/home.js"
import { loginRequired, verifyUser } from "./middlewares/auth.js"
import inventory from "./routes/inventory.js"
import usageRoutes from "./routes/stock_usage.js";
import user from "./routes/user.js"
import supplier from "./routes/supplier.js"
import itemSupplier from "./routes/item_supplier.js"
import purchaseOrder from "./routes/purchase_order.js"
import SwaggerParser from "@apidevtools/swagger-parser"
import attendance from "./routes/attendance.js";
const app = express();

app.use((req, res, next) => {
  console.log("Before CORS:", req.method, req.url);
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log("After CORS:", req.method, req.url);
  next();
});


app.use(express.json());
app.use(cookieParser());
app.use(verifyUser);

app.get("/", home);
app.use("/user", user);
app.use("/inventory", loginRequired, inventory);
app.use("/usage", loginRequired, usageRoutes);

app.use("/supplier", loginRequired, supplier);
app.use("/itemSupplier", loginRequired, itemSupplier);
app.use("/purchaseOrder", loginRequired, purchaseOrder);

app.use("/attendance", loginRequired, attendance);

app.use("/uploads", express.static("uploads"));


async function setupSwagger() {
  const api = await SwaggerParser.dereference("./docs/openapi.yaml");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(api));
}
setupSwagger();


export default app;