/**
 * Example of creating reusable modules.
 * The code is pretty much the same as in the Advanced version, a bit simplified but made reusable.
 */

import { makeAutoObservable, when } from "mobx";

import { fakeFetchProducts, fakeFetchCategories, matches } from "../api";

class Collection {
  // ====================================================
  // State
  // ====================================================
  data = [];

  query = "";
  sortAsc = true;

  fetched = false;
  fetching = false;

  props = {};

  constructor(props) {
    makeAutoObservable(this);

    this.props = props;

    when(
      () => !this.query && this.sortAsc,
      () => console.log("All filters cleared")
    );
  }

  // ====================================================
  // Computed views
  // ====================================================
  get results() {
    return this.data
      .slice()
      .filter((item) => (this.query ? matches(this.query, item.title) : true))
      .sort((a, b) => (this.sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
  }

  get canClearFilters() {
    return this.query || !this.sortAsc;
  }

  // ====================================================
  // Actions
  // ====================================================
  onFetch = async () => {
    this.fetching = true;

    try {
      const res = await this.props.fetch();
      this.onFetchSuccess(res.data);
    } catch (error) {
      console.log("Failed to fetch", error);
    } finally {
      this.fetching = false;
    }
  };

  onFetchSuccess = (data) => {
    this.data.replace(data);
    this.fetched = true;
  };

  onSetFilter = (key, value) => {
    this.filters[key] = value;
  };

  onChangeQuery = (query) => {
    this.query = query;
  };

  onChangeSort = (sortAsc) => {
    this.sortAsc = sortAsc;
  };

  onClearFilters = () => {
    this.filters = {};
    this.sortAsc = true;
    this.query = "";
  };
}

class ComplexStore {
  products = new Collection({ fetch: fakeFetchProducts });
  categories = new Collection({ fetch: fakeFetchCategories });
}

export const store = new ComplexStore();
