import { Router } from "express";
import { AuthController } from "./auth.controller";

export class AuthRoutes {
  public router: Router;
  public authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /api/auth/sign-up:
     *   post:
     *     summary: Registrar un nuevo usuario.
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "John Doe"
     *               email:
     *                 type: string
     *                 example: "johndoe@example.com"
     *               password:
     *                 type: string
     *                 example: "password123"
     *     responses:
     *       201:
     *         description: Usuario registrado exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Usuario registrado exitosamente."
     *       400:
     *         description: Error al registrar el usuario.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: false
     *                 error:
     *                   type: string
     *                   example: "El usuario ya existe."
     */
    this.router.post("/auth/sign-up", this.authController.signUp);

    /**
     * @swagger
     * /api/auth/sign-in:
     *   post:
     *     summary: Iniciar sesión para un usuario.
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "johndoe@example.com"
     *               password:
     *                 type: string
     *                 example: "password123"
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: true
     *                 token:
     *                   type: string
     *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
     *       400:
     *         description: Error en las credenciales proporcionadas.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: false
     *                 error:
     *                   type: string
     *                   example: "Credenciales inválidas."
     */
    this.router.post("/auth/sign-in", this.authController.signIn);
  }
}
