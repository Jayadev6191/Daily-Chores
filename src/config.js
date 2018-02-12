// Initialize Firebase
// import firebase from 'firebase/app';
// import 'firebase/database';
var firebase = require('firebase/app');
require('firebase/database');

// replace below config values with your actual firebase account
const DB_CONFIG = {
    apiKey: "FIREBASE_API_KEY",
    authDomain: "FIREBASE_AUTH_DOMAIN",
    databaseURL: "FIREBASE_DATABASE_URL",
    projectId: "FIREBASE_PROJECT_ID",
    storageBucket: "FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID",
};

var app = firebase.initializeApp(DB_CONFIG);
var database = app.database();

var config = {
  app,
  database
}

module.exports = config;