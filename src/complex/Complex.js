import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "./Complex.store";
import { Collection } from "./Collection";

export const Complex = observer(() => {
  const store = useStore();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: 48 }}>
        Categories
        <Collection collection={store.categories} />
      </div>

      <div>
        Products
        <Collection collection={store.products} />
      </div>
    </div>
  );
});
