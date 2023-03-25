import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { makeObservable, observable, runInAction } from "mobx";
import { db } from "../firebase";

type User = {
  name: string | null;
  email: string | null;
  avatar: string | null;
  id: string;
};

class UserStore {
  @observable userId: string = "";
  @observable user: User | null = null;

  constructor() {
    makeObservable(this);
  }

  firebaseUserRef = () => {
    return doc(db, "users", this.userId);
  };

  async createOrUpdateUser(user: User) {
    await setDoc(this.firebaseUserRef(), user);
  }

  subscribeToUser() {
    const unsub1 = onSnapshot(this.firebaseUserRef(), (doc) => {
      runInAction(() => {
        const data = doc.data();
        this.user = data as User;
      });
    });

    return () => {
      unsub1?.();
    };
  }
}

export default new UserStore();
