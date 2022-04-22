export default class MainWindow {
  constructor(element) {
    this.element = element;
  }

  show() {
    this.element.classList.remove('disable');
  }

  hide() {
    this.element.classList.add('disable');
  }
}
