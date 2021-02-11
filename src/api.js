import lowerCase from "lodash.lowercase";

const products = [
  { id: 1, title: "iPhone 8", category: "Phone" },
  { id: 2, title: "Samsung Galaxy", category: "Phone" },
  { id: 3, title: "OnePlus 8", category: "Phone" },

  { id: 4, title: "Dell XPS", category: "Laptop" },
  { id: 5, title: "Macbook Pro", category: "Laptop" },
  { id: 6, title: "Asus Zenbook", category: "Laptop" },

  { id: 7, title: "Nikon D750", category: "Camera" },
  { id: 8, title: "Canon M50", category: "Camera" },
  { id: 9, title: "Leica M6", category: "Camera" },
];

const categories = [
  { id: 1, title: "Phone" },
  { id: 2, title: "Laptop" },
  { id: 3, title: "Camera" },
];

const matches = (query, source) => lowerCase(source).includes(lowerCase(query));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const makeFakeFetch = async (query, data) => {
  const results = query ? data.filter((item) => lowerCase(item.title).includes(lowerCase(query))) : data;

  await sleep(500);

  return Promise.resolve({
    data: results,
    total: results.length,
  });
};

const fakeFetchProducts = (query) => makeFakeFetch(query, products);

const fakeFetchCategories = (query) => makeFakeFetch(query, categories);

export { fakeFetchProducts, fakeFetchCategories, matches };
