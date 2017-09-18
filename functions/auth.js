const admin = require('firebase-admin');

exports.verifyIdToken = (req, res, next) => {
  const tokenId = req.get('Authorization').split('Bearer ')[1];
  return admin.auth().verifyIdToken(tokenId)
    .then(decoded => {
      req.user = decoded;
      next();
    })
    .catch(err => res.status(401).send(err));
};
