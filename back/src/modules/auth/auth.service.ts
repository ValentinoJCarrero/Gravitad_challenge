import User from "../../models/user.model";
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

async function signUp(name: string, email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('El usuario ya existe');

    const hashedUser = new User({
        name,
        email,
        password: CryptoJS.SHA256(password).toString()
    })

    return await hashedUser.save();
}

async function signIn(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw Error('Credenciales invalidas.');
    if(user.isAdmin === false) throw Error('Acceso solo para administradores.');

    const isPasswordValid = (user.password === (CryptoJS.SHA256(password).toString()));
    if (!isPasswordValid) throw Error('Credenciales invalidas.');

    const token = jwt.sign(
        { id: user._id, email: user.email },
        'random',
        { expiresIn: '1h' }
    )

    return token;
}

export const authService = { signUp, signIn };