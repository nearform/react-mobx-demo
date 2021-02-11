import React from "react";
import { observer } from "mobx-react-lite";

import { store } from "./Advanced.store";

const CATEGORIES = ["", "Phone", "Laptop", "Camera"];

const Filters = observer(() => {
  const {
    fetched,
    query,
    category,
    sortAsc,
    canClearFilters,
    onChangeCategory,
    onChangeQuery,
    onChangeSort,
    onClearFilters,
  } = store;

  if (!fetched) {
    return null;
  }

  return (
    <>
      <div>
        Filter:
        <select value={category || ""} onChange={(e) => onChangeCategory(e.target.value)}>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category || "All"}
            </option>
          ))}
        </select>
      </div>

      <div>
        Search:
        <input type="text" value={query} onChange={(e) => onChangeQuery(e.target.value)} />
      </div>

      <div>
        Sort ascending:
        <input type="checkbox" checked={sortAsc} onChange={(e) => onChangeSort(e.target.checked)} />
      </div>

      {canClearFilters && <button onClick={onClearFilters}>Clear filters</button>}
    </>
  );
});

export const Advanced = observer(() => {
  const { fetching, results, onFetch } = store;

  return (
    <>
      <div>
        <button onClick={onFetch}>{fetching ? "Fetching" : "Fetch"}</button>
      </div>

      <Filters />

      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  );
});
