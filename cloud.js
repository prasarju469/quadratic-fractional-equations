/* Optional Google sign-in and cloud sync (Firebase).
   With no config the site runs in local mode and nothing here is used. */
const Cloud = (() => {
  const cfg = window.KQ_CONFIG || {};
  const norm = (e) => String(e || '').trim().toLowerCase();
  const C = { enabled: !!cfg.firebase, email: '', role: 'local', name: '' };
  let auth, db, timer, pending = null, retryTimer=null, retryDelay=1500, lastData=null;const inFlight=new Set();

  const load = (src) => new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('Could not load ' + src)); document.head.appendChild(s);
  });
  const screen = (html) => { document.getElementById('app').innerHTML = `<div class="block logincard">${html}</div>`; };
  const never = () => new Promise(() => {});

  C.ready = async () => {
    if (!C.enabled) return;
    document.body.classList.add('locked');
    screen('<p class="muted">Loading…</p>');
    try {
      const base = 'https://www.gstatic.com/firebasejs/10.12.2/';
      await load(base + 'firebase-app-compat.js'); await load(base + 'firebase-auth-compat.js'); await load(base + 'firebase-firestore-compat.js');
    } catch (e) { screen('<h2>Cannot reach the sign-in service</h2><p>Check the internet connection and reload the page.</p>'); return never(); }
    firebase.initializeApp(cfg.firebase); auth = firebase.auth(); db = firebase.firestore();
    const user = await new Promise((res) => { const off = auth.onAuthStateChanged((u) => { off(); res(u); }); });
    return user ? C.accept(user) : C.login();
  };

  C.login = () => new Promise((resolve) => {
    screen(`<h1>Sign in</h1><p>Use your Google account to continue. Your progress is saved to your account, so it follows you to any device.</p>
      <button class="btn primary big" id="gsign">Sign in with Google</button><p class="muted" id="gerr"></p>`);
    document.getElementById('gsign').onclick = async () => {
      try { const r = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); resolve(C.accept(r.user)); }
      catch (e) { document.getElementById('gerr').textContent = 'Sign-in did not finish. ' + (e.code === 'auth/popup-blocked' ? 'Allow pop-ups for this site and try again.' : 'Please try again.'); }
    };
  });

  /* Who may use the site is decided by the Firestore rules, not by a list in this public file.
     A teacher may list every user document. A student may read only their own. Anyone else is refused. */
  C.accept = async (user) => {
    const email = norm(user.email);
    try { await db.collection('users').limit(1).get(); C.role = 'teacher'; }
    catch (e1) {
      try { await db.collection('users').doc(email).get(); C.role = 'student'; }
      catch (e2) {
        if (e2 && e2.code === 'permission-denied') {
          screen(`<h1>Not set up yet</h1><p><b>${email}</b> is not on the list for this course. Ask your teacher to add it, or sign in with a different Google account.</p><button class="btn" id="gout">Sign out</button>`);
          document.getElementById('gout').onclick = C.signOut;
        } else {
          screen('<h1>Cannot check your account</h1><p>Check the internet connection and reload the page.</p><button class="btn" id="gout">Sign out</button>');
          document.getElementById('gout').onclick = C.signOut;
        }
        return never();
      }
    }
    const view=await window.LearnerView?.select({auth,db,user});C.preview=!!view?.parent;if(!C.preview)await window.PlayerProfile?.connect({auth,db,user,role:C.role});C.email = email; C.name = C.preview?view.name:(window.PlayerProfile?.name() || user.displayName || email);if(!C.preview)window.LearningTracker?.start({subject:'maths',email,auth,db,role:C.role});
  };

  /* Keep whichever copy (this browser or the cloud) was saved most recently. */
  C.merge = async (Store) => {
    if(C.preview){const d=window.LearnerView.data('maths');Store.d={v:2,stats:{},done:{},cleared:{},notes:{},checks:{},drills:[],avatar:'🦊',pos:0,...(d||{})};if(Store.migrate)Store.migrate(Store.d);return;}
    if (!C.enabled) return;
    try {
      const snap = await db.collection('users').doc(C.email).get();
      if (snap.exists) {
        const cloud = JSON.parse(snap.data().data || '{}');
        if (Store.migrate) Store.migrate(cloud);
        if ((cloud.updated || 0) > (Store.d.updated || 0)) { window.MathsRewards.merge(cloud,Store.d);Object.assign(Store.d, cloud);Store.saveLocal();await C.push(Store.d,true);return; }
        window.MathsRewards.merge(Store.d,cloud);
      }
      await C.push(Store.d, true);
    } catch (e) { console.warn('Cloud sync pending; retrying automatically',e);const identity=C.email;pending=()=>{pending=null;if(C.preview||C.email!==identity)return Promise.resolve();return C.merge(Store);};scheduleRetry(); }
  };

  function scheduleRetry(){if(retryTimer||!pending||C.preview)return;retryTimer=setTimeout(()=>{retryTimer=null;if(pending){clearTimeout(timer);pending();}},retryDelay);retryDelay=Math.min(30000,retryDelay*2);retryTimer?.unref?.();}
  C.push = (d, now) => {
    if (C.preview || !C.enabled || !C.email || !db) return Promise.resolve();
    lastData=d;clearTimeout(timer);clearTimeout(retryTimer);retryTimer=null;
    const identity=C.email;
    const go = () => {
      pending=null;if(C.preview||C.email!==identity||norm(auth.currentUser?.email)!==identity)return Promise.resolve();
      const current=lastData||d;window.MathsRewards.ensure?.(current);const snapshot=JSON.parse(JSON.stringify(current)),policy={...window.MathsRewards,merge:window.MathsRewards.mergeSaved||window.MathsRewards.merge};
      const task=window.SharedRewards.saveSubject(db,db.collection('users').doc(identity),null,snapshot,policy,{name:C.name,role:C.role}).then(()=>{if(C.email!==identity)return;(window.MathsRewards.mergeSaved||window.MathsRewards.merge)(current,snapshot);retryDelay=1500;try{localStorage.setItem('kq_v1_'+identity,JSON.stringify(current));}catch{}}).catch(e=>{console.warn('Cloud save pending; retrying automatically',e);if(C.email===identity&&!C.preview){if(!pending)pending=go;scheduleRetry();}});
      inFlight.add(task);task.finally(()=>inFlight.delete(task));return task;
    };
    if(now)return go();pending=go;timer=setTimeout(go,1500);return Promise.resolve();
  };
  function retryPending(){if(pending&&!C.preview){clearTimeout(timer);clearTimeout(retryTimer);retryTimer=null;pending();}}
  document.addEventListener('visibilitychange',retryPending);
  window.addEventListener?.('online',retryPending);
  window.addEventListener?.('focus',retryPending);
  C.flush=async()=>{clearTimeout(timer);clearTimeout(retryTimer);retryTimer=null;if(pending)await pending();await Promise.all([...inFlight]);if(pending)throw new Error('Cloud save pending');};

  C.listStudents = async () => {
    const snap = await db.collection('users').get();
    return snap.docs.filter((x) => x.data().role !== 'teacher' && x.id !== C.email)
      .map((x) => Object.assign(JSON.parse(x.data().data || '{}'), { _name: x.data().name, _email: x.id }));
  };
  C.signOut = async () => {await window.LearningTracker?.flush().catch(()=>{});window.LearningTracker?.stop();await C.flush();if(auth)await auth.signOut();location.reload();};
  return C;
})();
