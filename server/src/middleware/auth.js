// src/middleware/auth.js
export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ success: false, message: "Not authenticated" });
}