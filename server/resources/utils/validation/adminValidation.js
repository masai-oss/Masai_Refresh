
const checkAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({
      error: true,
      message: "Not an Admin",
    });
  }
  else {
    next()
  }
}


module.exports = {
  checkAdmin
};
