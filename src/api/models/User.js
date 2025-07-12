import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  age: Number,
  email: { type: String, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['invite', 'user', 'admin'], default: 'invite' },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  console.log('password saved:', this.password);
  console.log('password:', password);
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);
