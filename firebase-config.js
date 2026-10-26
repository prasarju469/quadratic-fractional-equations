/* Sign-in and cloud-sync settings.
   Leave `firebase` as null to run in local mode (no sign-in, progress stays in this browser).
   To turn on Google sign-in, follow SETUP.md and paste your Firebase web config below.
   Who is allowed in is set in the Firestore rules (see firestore.rules), not here. */
window.KQ_CONFIG = {
  firebase: {
    apiKey: "AIzaSyChMyel_kFY_ZqWUZOqZ6tJlkRgOhjxeQY",
    authDomain: "quadratics-kavin.firebaseapp.com",
    projectId: "quadratics-kavin",
    storageBucket: "quadratics-kavin.firebasestorage.app",
    messagingSenderId: "715992919776",
    appId: "1:715992919776:web:09d7a99de9b1dd8110aa85",
  },
};
