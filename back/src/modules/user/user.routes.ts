import { Router } from "express";
import { UserController } from "./user.controller";

export class UserRoutes {
  public router: Router;
  public userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /api/user:
     *   get:
     *     summary: Obtener una lista de usuarios.
     *     tags: [User]
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Número de página de usuarios a recuperar.
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           example: 9
     *         description: Límite de usuarios por página.
     *     responses:
     *       200:
     *         description: Lista de usuarios obtenida exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                 data:
     *                   type: object
     *                   properties:
     *                     users:
     *                       type: array
     *                       items:
     *                         $ref: '#/components/schemas/User'
     *                     total:
     *                       type: integer
     *       400:
     *         description: Error al obtener la lista de usuarios.
     */
    this.router.get("/user", this.userController.getUsers);

    /**
     * @swagger
     * /api/user/api:
     *   get:
     *     summary: Guardar usuarios desde una API externa.
     *     tags: [User]
     *     responses:
     *       201:
     *         description: Usuarios cargados exitosamente desde la API.
     *       400:
     *         description: Error al cargar usuarios desde la API.
     */
    this.router.get("/user/api", this.userController.saveUsersFromAPI);

    /**
     * @swagger
     * /api/user/create:
     *   post:
     *     summary: Crear un nuevo usuario.
     *     tags: [User]
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
     *         description: Usuario creado exitosamente.
     *       400:
     *         description: Error al crear el usuario.
     */
    this.router.post("/user/create", this.userController.createUser);

    /**
     * @swagger
     * /api/user/{userId}:
     *   put:
     *     summary: Actualizar un usuario existente.
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID del usuario a actualizar.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Jane Doe"
     *               email:
     *                 type: string
     *                 example: "janedoe@example.com"
     *     responses:
     *       200:
     *         description: Usuario actualizado exitosamente.
     *       400:
     *         description: Error al actualizar el usuario.
     */
    this.router.put("/user/:userId", this.userController.updateUser);

    /**
     * @swagger
     * /api/user/{userId}:
     *   delete:
     *     summary: Eliminar un usuario existente.
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: ID del usuario a eliminar.
     *     responses:
     *       200:
     *         description: Usuario eliminado exitosamente.
     *       400:
     *         description: Error al eliminar el usuario.
     */
    this.router.delete("/user/:userId", this.userController.deleteUser);
  }
}
