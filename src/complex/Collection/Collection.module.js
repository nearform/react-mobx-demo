import t from "prop-types";
import { makeAutoObservable } from "mobx";

import { matches } from "../../api";

export class CollectionModule {
  // ====================================================
  // State
  // ====================================================
  data = [];

  filtersState = {};
  filtersDefinition = {};

  query = "";
  sortAsc = true;

  fetched = false;
  fetching = false;

  props = {};

  constructor(props) {
    makeAutoObservable(this);

    this.props = props;

    if (props.filters) {
      Object.entries(props.filters).forEach(([key, options]) => this.onSetFilterDefinition(key, options));
    }
  }

  // ====================================================
  // Computed views
  // ====================================================
  get results() {
    return (
      this.data
        // get a copy of the data for this view (.sort() modifies arrays in place)
        .slice()

        // sort alphabetically
        .sort((a, b) => (this.sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)))

        // filter by query match
        .filter((item) => (this.query ? matches(this.query, item.title) : true))

        // filter by filters state
        .filter((item) =>
          Object.entries(this.filtersState).every(([key, filter]) =>
            Object.entries(item).every(([prop, value]) => {
              if (key === prop && filter) {
                return filter === value;
              }

              return true;
            })
          )
        )
    );
  }

  get hasFilters() {
    return Object.keys(this.filtersState).length && Object.values(this.filtersState).every((state) => state);
  }

  get canClearFilters() {
    return Boolean(this.query || !this.sortAsc || this.hasFilters);
  }

  // ====================================================
  // Actions
  // ====================================================
  onFetch = async () => {
    this.fetching = true;

    try {
      const res = await this.props.fetch();
      this._onFetchSuccess(res.data);
    } catch (error) {
      this._onFetchFailure(error);
    }
  };

  _onFetchSuccess = (data) => {
    this.data.replace(data);
    this.fetched = true;
    this.fetching = false;
  };

  _onFetchFailure = (error) => {
    console.log("Failed to fetch", error);
    this.fetching = false;
  };

  onSetFilterState = (key, value) => {
    this.filtersState[key] = value;
  };

  onSetFilterDefinition = (key, options) => {
    this.filtersDefinition[key] = options;
  };

  onChangeQuery = (query) => {
    this.query = query;
  };

  onChangeSort = (sortAsc) => {
    this.sortAsc = sortAsc;
  };

  onClearFilters = () => {
    this.filtersState = {};
    this.sortAsc = true;
    this.query = "";
  };
}

// If you use TypeScript, you can just use the class itself as a type
export const CollectionPropType = t.shape({
  data: t.arrayOf(t.object).isRequired,
  query: t.string.isRequired,
  sortAsc: t.bool.isRequired,
  fetched: t.bool.isRequired,
  fetching: t.bool.isRequired,
  props: t.shape({
    fetch: t.func.isRequired,
    filters: t.objectOf(t.array),
  }).isRequired,
});
