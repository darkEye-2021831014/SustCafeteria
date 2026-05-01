import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import swaggerUi from "swagger-ui-express"
import home from "./controllers/home.js"
import { loginRequired, verifyUser } from "./middlewares/auth.js"
import inventory from "./routes/inventory.js"
  next();

app.use(verifyUser);

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