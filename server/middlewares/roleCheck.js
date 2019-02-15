const roleCheck = (roles, redirectTo = "/") => (req, res, next) => {
  if (roles.includes(req.user.role)) return next();
  req.flash(
    "error",
    `You are not ${roles.toString()}, you can't enter in ${req.path}`
  );
  return res.redirect(redirectTo);
};

module.exports = {
  roleCheck
};
