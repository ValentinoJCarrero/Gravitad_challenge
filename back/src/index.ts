import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { AuthRoutes } from "./modules/auth/auth.routes";
import { UserRoutes } from "./modules/user/user.routes";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 8001;

mongoose.connect(process.env.DB_URI!);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gravitad Challenge",
      version: "1.0.0",
      description: "Documentación de API",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Servidor de desarrollo",
      },
    ],
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string', description: 'ID único de usuario', example: '615c1a6f7b9d9c07a1234567'
                    },
                    name: {
                        type: 'string', description: 'Nombre completo del usuario', example: 'John Doe'
                    },
                    email: {
                        type: 'string', description: 'Email del usuario', example: 'email@email.com'
                    },
                    password: {
                        type: 'string', description: 'Contraseña de administrador'
                    }
                },
                required: ['name', 'email']
            }
        }
    }
  },
  apis: ["./**/*.ts"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/", (req, res) => {
  res.redirect("/api");
});
app.get("/api", (req, res) => {
  res.send("Challenge para Gravitad");
});

const authRoutes = new AuthRoutes();
app.use("/api", authRoutes.router);
const userRoutes = new UserRoutes();
app.use("/api", userRoutes.router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
