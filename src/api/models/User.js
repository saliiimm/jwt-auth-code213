import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  age: Number,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['invite', 'user', 'admin'], default: 'invite' },
});

export const User = mongoose.model('User', userSchema);
