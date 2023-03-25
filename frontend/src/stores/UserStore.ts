import { makeObservable, observable } from "mobx";

class UserStore {
  @observable userId: string = "";
  @observable user: any | null = null;

  constructor() {
    makeObservable(this);
  }
}

export default new UserStore();
