import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

const User = model('User', userSchema);

export default User;