import { Request, Response } from "express";
import { userService } from "./user.service";

export class UserController {
    public async getUsers(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1; 
            const limit = parseInt(req.query.limit as string) || 9;
            
            const users = await userService.getUsers(page, limit);
            res.json({ ok: true, data: users });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    public async createUser(req: Request, res: Response) {
        const { name, email, password } = req.body;
        
        try {
            await userService.createUser(name, email, password);
            res.status(201).json({ ok: true, message: 'Usuario registrado exitosamente.' });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            if(!req.params.userId) throw Error('Propiedad "userId" es requerida.');
            if(!req.body.admin) throw Error('Propiedad "admin" es requerida.');
    
            const user = await userService.updateUser(req.params.userId, req.body.admin);
            res.json({ ok: true, user });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            if(!req.params.userId) throw Error('Propiedad "userId" es requerida.');
        
            await userService.deleteUser(req.params.userId);
            res.json({ ok: true, message: 'Usuario eliminado exitosamente.' });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    public async saveUsersFromAPI(req: Request, res: Response) {
        try {
            await userService.saveUsersFromAPI();
            res.status(201).json({ ok: true, message: 'Usuarios cargados desde la API.' });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }
}