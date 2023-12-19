import { makeAutoObservable } from "mobx";

export default class ProjectStore {
  constructor() {
    this._categories = [];
    this._selectedCategory = {};
    this._projects = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    this._limitHeader = 10;
    this._limitAll = 50;
    makeAutoObservable(this);
  }

  setCategories(categories) {
    this._categories = categories;
  }
  setProjects(projects) {
    this._projects = projects;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  setSelectedCategory(category) {
    this.setPage(1);
    this._selectedCategory = category;
  }

  get projects() {
    return this._projects;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
  get limitHeader() {
    return this._limitHeader;
  }
  get limitAll() {
    return this._limitAll;
  }
  get categories() {
    return this._categories;
  }

  get selectedCategory() {
    return this._selectedCategory;
  }
}
