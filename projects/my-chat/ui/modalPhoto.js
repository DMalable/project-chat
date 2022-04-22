export default class ModalPhoto {
  constructor(element, onUpload) {
    this.element = element;
    this.onUpload = onUpload;

    const closeIcon = element.querySelector('.photo-loader__close');

    closeIcon.addEventListener('click', () => {
      this.hide();
    });

    //!!!!!!!!!!!!!!!!!!!!!!!!!
    this.element.addEventListener('dragover', (e) => {
      if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === 'file') {
        e.preventDefault();
      }
    });

    this.element.addEventListener('drop', (e) => {
      const file = e.dataTransfer.items[0].getAsFile();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => this.onUpload(reader.result));
      e.preventDefault();
    });
  }

  setAvatar(photo) {
    this.element.querySelector(
      '.photo-loader__icon'
    ).style.backgroundImage = `url(${photo})`;
  }

  show() {
    this.element.classList.remove('disable');
  }

  hide() {
    this.element.classList.add('disable');
  }
}
