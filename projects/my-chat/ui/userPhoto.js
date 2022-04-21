export default class UserPhoto {
  constructor(element, onUpload) {
    this.element = element;
    this.onUpload = onUpload;

    this.element.addEventListener('dragover', (e) => {
      console.log('dragover');
      if (e.target.classList.contains('user__avatar')) {
        if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === 'file') {
          e.preventDefault();
        }
      }
    });

    this.element.addEventListener('drop', (e) => {
      console.log('drop');
      if (e.target.classList.contains('user__avatar')) {
        // let that = e.target;
        const file = e.dataTransfer.items[0].getAsFile();
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.addEventListener('load', () => this.onUpload(reader.result));
        e.preventDefault();
      }
    });
  }

  set(photo) {
    console.log(photo);
    this.element.style.src = `url(${photo})`;
  }
}
