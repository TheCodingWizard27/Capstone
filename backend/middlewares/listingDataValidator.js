const validateListing = async (req, res, next) => {
  const schema = require("../schemas/listing.json");
  const body = req.body;
  const errors = [];

  // Ensure body behaves as an object
  const bodyObj = typeof body === "object" && body !== null ? body : {};

  for (const key in schema) {
    const property = schema[key];

    // Check if the property is required and missing
    if (
      property.required &&
      !Object.prototype.hasOwnProperty.call(bodyObj, key)
    ) {
      errors.push(`${key} is required.`);
      continue;
    }

    // Skip further checks if the property is not present
    if (!Object.prototype.hasOwnProperty.call(bodyObj, key)) {
      continue;
    }

    // Additional checks (e.g., max words)
    if (property.maxWords && typeof bodyObj[key] === "string") {
      const wordCount = bodyObj[key].split(/\s+/).filter(Boolean).length;
      if (wordCount > property.maxWords) {
        errors.push(`${key} must not exceed ${property.maxWords} words.`);
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

module.exports = validateListing;
