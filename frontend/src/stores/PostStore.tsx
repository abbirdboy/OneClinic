import {
    observable,
    makeObservable,
    runInAction,
} from 'mobx';

import {
    doc,
    setDoc,
    onSnapshot,
} from 'firebase/firestore';

import { db } from '../firebase';
import UserStore from './UserStore';

class PostStore {
    @observable post: string | null = null;

    constructor() {
        makeObservable(this);
    }

    async setPostText(post: string) {
        return setDoc(this.firestoreCallsRef(), { post }, { merge: true });
    }

    firestoreCallsRef() {
        return doc(db, 'posts', UserStore.userId);
    }

    subscribeToPost() {
        const unsub1 = onSnapshot(this.firestoreCallsRef(), (doc) => {
            runInAction(() => {
                const data = doc.data();
                this.post = data?.post;
            });
        });
        
        return () => {
            unsub1?.();
        }
    }
}

const postStore = new PostStore();

export default postStore;