const { auth } = require("../firebase/firebase");

const verifyAuthToken = async (req, res, next) => {
  const idToken =
    req.headers.authorization && req.headers.authorization.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken; // Attach the decoded token to the request object for further use
    next(); // Call the next middleware or route handler
  } catch (error) {
    if (
      error.code === "auth/argument-error" ||
      error.message.includes("Decoding Firebase ID token failed")
    ) {
      return res.status(401).send("Unauthorized: Invalid or expired token");
    } else {
      return res.status(500).send(`Error: ${error.message}`);
    }
  }
};

module.exports = verifyAuthToken;
