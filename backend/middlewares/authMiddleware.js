const { auth } = require("../firebase/firebase");

const verifyAuthToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Received Authorization Header:", authHeader);

  const idToken =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split("Bearer ")[1]
      : null;

  if (!idToken) {
    console.log("No token provided.");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    console.log("Verifying token...");
    const decodedToken = await auth.verifyIdToken(idToken);
    console.log("Decoded Token:", decodedToken);

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification error:", error);

    if (
      error.code === "auth/argument-error" ||
      error.message.includes("Decoding Firebase ID token failed")
    ) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token" });
    } else {
      return res
        .status(500)
        .json({ message: `Authentication error: ${error.message}` });
    }
  }
};

module.exports = verifyAuthToken;
