import { Request, Response } from 'express';
import { authService } from './auth.service';

export class AuthController {

    public async signUp(req: Request, res: Response) {
        const { name, email, password } = req.body;
        
        try {
            await authService.signUp(name, email, password);
            res.status(201).json({ ok: true, message: 'Usuario registrado exitosamente.' });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }

    public async signIn(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const token = await authService.signIn(email, password);
            res.status(200).json({ ok: true, token });
        } catch (error: any) {
            res.status(400).json({ ok: false, error: error.message });
        }
    }
}