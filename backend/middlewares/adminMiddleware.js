const jwt = require("jsonwebtoken");

// Middleware to verify admin token
const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || decoded.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Forbidden: Invalid admin token" });
      }

      req.user = decoded; // Attach decoded token to request
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    console.error("Admin verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = verifyAdmin;
