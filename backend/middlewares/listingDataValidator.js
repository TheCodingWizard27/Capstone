const validateListing = async (req, res, next) => {
  const schema = require("../schemas/listing.json");
  const body = req.body;
  const errors = [];

  for (const key in schema) {
    const property = schema[key];

    // Check if the property is required and missing
    if (property.required && !body.hasOwnProperty(key)) {
      errors.push(`${key} is required.`);
      continue;
    }

    // Skip validation if the property is not required and missing
    if (!property.required && !body.hasOwnProperty(key)) {
      continue;
    }

    for (const propKey in property) {
      switch (propKey) {
        case "type":
          if (
            property.type === "float" &&
            (typeof body[key] !== "number" || Number.isInteger(body[key]))
          ) {
            errors.push(`${key} must be a float.`);
          } else if (property.type === "int" && !Number.isInteger(body[key])) {
            errors.push(`${key} must be an integer.`);
          } else if (
            property.type === "string" &&
            typeof body[key] !== "string"
          ) {
            errors.push(`${key} must be a string.`);
          } else if (property.type === "url") {
            try {
              new URL(body[key]);
            } catch (e) {
              errors.push(`${key} must be a valid URL.`);
            }
          }
          break;

        case "maxWords":
          if (typeof body[key] === "string") {
            const wordCount = body[key].split(/\s+/).filter(Boolean).length;
            if (wordCount > property.maxWords) {
              errors.push(`${key} must not exceed ${property.maxWords} words.`);
            }
          }
          break;

        // Add more cases here for other property checks if necessary
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

module.exports = validateListing;
