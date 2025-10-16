import app from "./app.js";
import { config } from "./config/config.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Event API",
    },
  },
  apis: ["./src/routes/*.js"], // route files with JSDoc comments
};

// Generate swagger specification
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
