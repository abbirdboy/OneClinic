import { observable, makeObservable } from "mobx";
import React from "react";

class AnchorStore {
  @observable anchorEl: HTMLButtonElement | null = null;

  constructor() {
    makeObservable(this);
  }

  setAnchorEl(target: any) {
    this.anchorEl = target;
  }
}

const anchorStore = new AnchorStore();

export default anchorStore;
