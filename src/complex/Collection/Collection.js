import React from "react";
import { observer } from "mobx-react-lite";

import { CollectionPropType } from "./Collection.module";

const Filters = observer(({ collection }) => {
  const {
    canClearFilters,
    fetched,
    filtersState,
    filtersDefinition,
    onChangeQuery,
    onChangeSort,
    onClearFilters,
    onSetFilterState,
    query,
    sortAsc,
  } = collection;

  if (!fetched) {
    return null;
  }

  return (
    <>
      {filtersDefinition && (
        <div>
          {Object.entries(filtersDefinition).map(([filter, options]) => (
            <div key={filter}>
              {filter}:
              <select value={filtersState[filter] || ""} onChange={(e) => onSetFilterState(filter, e.target.value)}>
                <option value="">All</option>

                {options.map((option) => (
                  <option key={option.id} value={option.title}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

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

const Collection = observer(({ collection }) => {
  const { fetching, results, onFetch } = collection;

  return (
    <>
      <div>
        <button onClick={onFetch}>{fetching ? "Fetching" : "Fetch"}</button>
      </div>

      <Filters collection={collection} />

      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  );
});

Collection.propTypes = {
  collection: CollectionPropType.isRequired,
};

export { Collection };
