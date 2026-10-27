# Turn on Google sign-in and cloud progress (about 10 minutes)

Without this, the site still works but progress only lives in one browser.
With it, the student signs in with their Gmail and their progress follows them to any device, and
the teacher can read it from the **👀 Student** page.

Firebase's free plan is plenty for this.

## 1. Create the Firebase project
1. Go to https://console.firebase.google.com and sign in with **your** Google account.
2. **Create a project** (call it e.g. `quadratics`). You can turn Google Analytics off.

## 2. Turn on Google sign-in
1. Left menu **Build → Authentication → Get started**.
2. **Sign-in method → Google → Enable.** Pick your email as the support email, then Save.
3. **Settings → Authorized domains → Add domain**, and add `YOUR-GITHUB-USERNAME.github.io`
   (`localhost` is already there for testing).

## 3. Create the database
1. **Build → Firestore Database → Create database**. Choose **production mode** and any nearby region.
2. Open the **Rules** tab, paste the whole of `firestore.rules`, and click **Publish**.
   Before pasting, put the real Gmail addresses (all lowercase) in the `teachers()` and `students()` lists.
   This is the only place the email addresses go, and the rules live in your private Firebase console, not on the public site.

## 4. Connect the site
1. **Project settings (gear icon) → Your apps → Web (`</>`) → Register app.**
2. Copy the `firebaseConfig` values it shows.
3. Open `firebase-config.js` and replace `firebase: null` with them, like this:

```js
firebase: {
  apiKey: "...",
  authDomain: "...firebaseapp.com",
  projectId: "...",
  appId: "..."
},
```

The Firebase web config is **not a secret**. Access is controlled by the rules in step 3, so only the
listed Gmail accounts can read or write anything. No email addresses are stored on the public site.

## 5. Check it
Open the site. You should see **Sign in with Google**.
- Signing in as the teacher shows teacher material and the **👀 Student** page.
- Signing in as the student shows only the student view.
- Any other Google account sees "Not set up yet".

## Notes
- Saves use Firestore merge writes so this maths course preserves the separate `physics` progress field used by Quantum Quest. Refresh tabs left open before this change so they load the updated save code.
- If the student's account is a school or Family Link account, Google may block signing in to outside
  sites. A personal Gmail works.
- Pop-up blockers can stop the sign-in window. Allow pop-ups for the site.
- Progress is also cached in the browser, so a short internet drop does not lose work. It syncs
  again afterwards, keeping whichever copy was saved most recently.
