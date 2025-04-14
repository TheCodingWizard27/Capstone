const cache = new Map();

/**
 * Caches all GET responses in memory for a given duration
 * @param {number} durationSeconds - cache duration in seconds
 */
function cacheAllGetResponses(durationSeconds = 60) {
  return (req, res, next) => {
    if (req.method !== "GET") return next();

    const key = req.originalUrl;

    const cached = cache.get(key);
    if (cached && Date.now() < cached.expiration) {
      res.set("X-Cache", "HIT");
      return res.send(cached.data);
    }

    const originalSend = res.send;

    res.send = (body) => {
      cache.set(key, {
        expiration: Date.now() + durationSeconds * 1000,
        data: body,
      });
      res.set("X-Cache", "MISS");
      return originalSend.call(res, body);
    };

    next();
  };
}

module.exports = cacheAllGetResponses;
