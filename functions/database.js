const admin = require('firebase-admin');

exports.writeUser = uid => {
  admin.database().ref(`users/${uid}`).set({
    loggedIn: true
  });
};
