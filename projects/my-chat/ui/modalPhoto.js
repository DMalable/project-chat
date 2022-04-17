export default class ModalPhoto {
  constructor(element) {
    this.element = element;

    const closeIcon = element.querySelector('.photo-loader__close');

    closeIcon.addEventListener('click', () => {
      this.hide();
    });
  }

  show() {
    this.element.classList.remove('disable');
  }

  hide() {
    this.element.classList.add('disable');
  }
}
