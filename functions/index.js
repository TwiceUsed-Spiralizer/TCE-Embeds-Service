const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const app = require('express')();

admin.initializeApp(functions.config().firebase);
const embedRef = admin.database().ref('embeds');

app.use(cors);

app.get('/:embedId', functions.https.onRequest((req, res) => {
  embedRef.child(req.params.embedId).once('value', chart => {
    const data = chart.val();
    if (data) {
      res.json(data);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
}));

exports.embed = functions.https.onRequest(app);
