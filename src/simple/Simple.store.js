import { makeAutoObservable } from "mobx";

class SimpleStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get isNegative() {
    return this.count < 0 ? "Yes" : "No";
  }

  onAdd = () => {
    this.count += 1;
  };

  onSubtract = () => {
    this.count -= 1;
  };
}

export const store = new SimpleStore();
