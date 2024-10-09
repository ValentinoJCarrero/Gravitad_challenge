import User from "../../models/user.model";
import axios from 'axios';
import CryptoJS from 'crypto-js';

async function getUsers(page: number, limit: number) {
    const users = await User.find({}, '-password -__v')
    .skip((page - 1) * limit).limit(limit);
    
    const total = await User.countDocuments();
    
    return { users, total };
}

async function createUser(name: string, email: string, password: string) {
    const existingUser = await User.findOne({ email }, '-password -__v');
    if (existingUser) throw new Error('El usuario ya existe');

    const hashedUser = new User({
        name,
        email,
        password: CryptoJS.SHA256(password).toString()
    })

    return await hashedUser.save();
}

async function updateUser(userId: string, admin: boolean) {
    const user = await User.findById(userId, '-password -__v');
    if(!user) throw new Error('Usuario no encontrado');

    user.isAdmin = admin;
    return await user.save();
}

async function deleteUser(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw Error('Usuario no encontrado');

    return await User.findByIdAndDelete(userId);
}

async function saveUsersFromAPI() {
    const user = await User.findOne({ isAdmin: false });
    if(user) throw new Error('Usuarios ya cargados.');

    const response = await axios.get('https://fakestoreapi.com/users?limit=10');
    const users = response.data;

    const usersDocuments = await Promise.all(users.map(async (user: any) => {
        const hashedPassword = CryptoJS.SHA256(user.password).toString();

        return {
            name: `${user.name.firstname} ${user.name.lastname}`,
            email: user.email,
            password: hashedPassword
        }
    }))

    usersDocuments.push({
        name: 'Admin',
        email: 'admin@mail.com',
        password: CryptoJS.SHA256('admin').toString(),
        isAdmin: true
    })

    await User.insertMany(usersDocuments);

    console.log('Precarga de usuarios completada.');
    return usersDocuments;
}

export const userService = { getUsers, createUser, updateUser, deleteUser, saveUsersFromAPI };