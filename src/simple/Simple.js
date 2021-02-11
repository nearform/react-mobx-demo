import React from "react";
import { observer } from "mobx-react-lite";

import { store } from "./Simple.store";

export const Simple = observer(() => {
  const { count, isNegative, onAdd, onSubtract } = store;

  return (
    <>
      <div>Count: {count}</div>

      <div>Is negative: {isNegative}</div>

      <button onClick={onAdd}>Add</button>
      <button onClick={onSubtract}>Subtract</button>
    </>
  );
});
