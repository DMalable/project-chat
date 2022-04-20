export default class MyUserName {
  constructor(element) {
    this.element = element;
  }

  set(name) {
    this.name = name;
    this.element.dataset.name = name;
  }

  get() {
    return this.name;
  }
}
