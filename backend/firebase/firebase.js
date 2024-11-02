const admin = require('firebase-admin');

// Replace with your path to the service account key
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = { auth, db };
