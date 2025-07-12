import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
  const { name, age, email, password } = req.body;
  try {
    const user = new User({
      name: name,
      age: age,
      email: email,
      password: password,
      role: 'user',
    });
    await user.save();
    res
      .status(201)
      .json({ message: 'User registered successfully', data: user });
  } catch (err) {
    res.status(500).json({ message: 'error registering user', err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
      res.status(400).json({ message: 'user or password incorrect' });
    }
    const isPasswordCorrect = user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'user or password incorrect' });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.status(200).json({ message: 'login successful', data: token });
  } catch (err) {
    res.status(500).json({ message: 'an error occured logging in', err });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({ message: 'User found', user: user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'error getting user info', err });
  }
};
