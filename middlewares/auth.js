const jwt = require("jsonwebtoken");
const User = require("../users/users.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("x-access-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();
    req.user = user; // Passage de l'objet user complet
    next();
  } catch (error) {
    res.status(401).send("Unauthorized: Invalid token");
  }
};
module.exports = authMiddleware;
