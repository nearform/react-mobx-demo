/**
 * Advanced example demonstrating all core MobX constructs.
 */

import { makeAutoObservable, when } from "mobx";

import { fakeFetchProducts, matches } from "../api";

class AdvancedStore {
  // ====================================================
  // State
  // ====================================================
  products = [];

  query = "";
  category = "";
  sortAsc = true;

  fetched = false;
  fetching = false;

  constructor() {
    makeAutoObservable(this);

    // Using reactions we can tie otherwise unrelated concerns and react to their changes
    when(
      () => !this.category && !this.query,
      () => console.log("All filters cleared")
    );
  }

  // ====================================================
  // Computed views
  // ====================================================
  // While MobX promotes OOP, we can still benefit from using FP where it's appropriate
  get results() {
    return this.products
      .slice() // slice is neeeded because .sort() modifies array in place and we need a copy instead
      .filter((product) => (this.category ? product.category === this.category : true))
      .filter((product) => (this.query ? matches(this.query, product.title) : true))
      .sort((a, b) => (this.sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
  }

  get canClearFilters() {
    return this.query || this.category || !this.sortAsc;
  }

  // ====================================================
  // Actions
  // ====================================================
  onFetch = async () => {
    this.fetching = true;

    try {
      const res = await fakeFetchProducts();
      this.onFetchSuccess(res.data);
    } catch (error) {
      console.log("Failed to fetch", error);
    } finally {
      this.fetching = false;
    }
  };

  onFetchSuccess = (products) => {
    this.products.replace(products);
    this.fetched = true;
  };

  onChangeCategory = (category) => {
    this.category = category;
  };

  onChangeQuery = (query) => {
    this.query = query;
  };

  onChangeSort = (sortAsc) => {
    this.sortAsc = sortAsc;
  };

  onClearFilters = () => {
    this.category = "";
    this.query = "";
    this.sortAsc = true;
  };
}

export const store = new AdvancedStore();
