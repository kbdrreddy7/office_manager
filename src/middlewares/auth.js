
const {utilService}=require("../services")

module.exports = function(req, res, next) {
  const token = req.header('Authorization') || req.query["Authorization"];

  if (!token) {
    return res.status(401).json({ error: 'No token present in header, authorization denied ' });
  }

  try {
      
    const decoded = utilService.decodeToken(token)
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ error: 'token is not valid, please login again' });
  }
};
