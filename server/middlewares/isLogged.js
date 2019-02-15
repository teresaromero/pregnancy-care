const isLoggedIn = () => (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.status(403).json({ error: "You have to log in" });
  return
};

const isLoggedOut = () => (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  return res.json({ error: "You are already log in" });
};

module.exports = {
  isLoggedIn,
  isLoggedOut
};
