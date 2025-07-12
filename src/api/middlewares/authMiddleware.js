import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  //recuperation du token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // condition ? cas1 : cas2
  // condition && cas

  //on verifie si il nous a bien envoye le token
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided' });
  }

  //verifier la validite du token
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    next();
  });
};
