import { ref, firebaseAuth } from '../config/firebase.js';

export function auth(email, pw, admin) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then((user) => {
      saveUser(user, admin);
    }, (err) => {
      console.log(err.message);
    });
}

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser(user, admin) {
  return ref.child(`users/${user.uid}`)
    .set({
      email: user.email,
      uid: user.uid,
      admin: admin
    })
    .then(() => user)
}

export function saveProperty(config) {
  return ref.child(`maps`)
    .push(config)
}

export function getUser(id) {
  const user = ref.child(`users/${id}`);
  return user.once('value');
}

export function getMaps() {
  const maps = ref.child(`maps`);
  return maps.once('value')
}