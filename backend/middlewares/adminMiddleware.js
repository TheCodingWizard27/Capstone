const jwt = require("jsonwebtoken");

// Middleware to verify admin token
const verifyAdmin = async (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.redirect("/admin/login");
};

module.exports = verifyAdmin;
