const jwt = require("jsonwebtoken");

const authMiddleware = (role) => {
  return (req, res, next) => {
    // Get token from cookies or Authorization header
    const token =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (role && decoded.role !== role) {
        return res.status(403).json({ message: "Forbidden. Insufficient permissions." });
      }
      req.user = decoded; // Attach decoded token to request object
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token." });
    }
  };
};



module.exports = authMiddleware;

