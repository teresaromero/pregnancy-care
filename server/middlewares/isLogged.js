const isLoggedIn = () => (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.json({ error: "You have to log in" });
};

const isLoggedOut = () => (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  return res.json({ error: "You are already log in" });
};

module.exports = {
  isLoggedIn,
  isLoggedOut
};
