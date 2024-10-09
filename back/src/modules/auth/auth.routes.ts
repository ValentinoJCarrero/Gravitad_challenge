import { Router } from "express";
import { AuthController } from "./auth,.controller";

export class AuthRoutes {
    public router: Router;
    public authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/auth/sign-up', this.authController.signUp);
        this.router.post('/auth/sign-in', this.authController.signIn);
    }
}