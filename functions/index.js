const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const app = require('express')();
const auth = require('./auth');
const database = require('./database');

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((req, res) => {
 res.send("Hello from Firebase!");
});

app.use(cors);
app.use(auth.verifyIdToken);

app.get('/auth', functions.https.onRequest((req, res) => {
  database.writeUser(req.user.user_id);
  res.send(req.user);
}));

exports.app = functions.https.onRequest(app);
