/**
 * Example of using reusable modules.
 */

import { autorun } from "mobx";
import { createContext, useContext } from "react";

import { fakeFetchProducts, fakeFetchCategories } from "../api";

import { CollectionModule } from "./Collection";

class ComplexStore {
  categories = new CollectionModule({
    fetch: fakeFetchCategories,
  });

  products = new CollectionModule({
    fetch: fakeFetchProducts,
    filters: {
      category: [],

      condition: [
        { id: "new", title: "new" },
        { id: "used", title: "used" },
      ],
    },
  });

  constructor() {
    // Populate products category filter from categories collection.
    // This could be done from inside the collection too but this is pretty complex as it is already.
    // The point is that we are free to do all kinds of things because OOP and MobX allows us to.
    autorun(() => this.products.onSetFilterDefinition("category", this.categories.data));
  }
}

const store = new ComplexStore();

const StoreContext = createContext(store);

// Using this hook we can get the store instance anyhwere in the render tree.
// We don't even need to use StoreContext.Provider, since useContext will fallback to default value, which is our store.
export const useStore = () => useContext(StoreContext);
