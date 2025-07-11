import { User } from '../models/User';

const register = async (req, res) => {
  const { name, age, email, password } = req.body;
  try {
    const user = new User({
      name: name,
      age: age,
      email: email,
      password: password,
      type: 'user',
    });
    await user.save();
    res
      .status(201)
      .json({ message: 'User registered successfully', data: user });
  } catch (err) {
    res.status(500).json({ message: 'error registering user', err });
  }
};
