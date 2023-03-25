import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { makeObservable, observable } from "mobx";
import UserStore from "./UserStore";

const auth = getAuth();

class AuthStore {
  @observable loggedIn: boolean = false;

  constructor() {
    makeObservable(this);
  }

  handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  authSubscription = () => {
    onAuthStateChanged(auth, (user) => {
      console.log("[AuthStore] onAuthStateChanged: ", user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        UserStore.user = user;
        UserStore.userId = uid;
        this.loggedIn = true;
        // ...
      } else {
        this.loggedIn = false;
        UserStore.user = null;
        UserStore.userId = "";
        // User is signed out
        // ...
      }
    });
  };
}

export default new AuthStore();
