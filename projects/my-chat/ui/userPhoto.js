export default class UserPhoto {
  constructor(element, onUpload) {
    this.element = element;
    this.onUpload = onUpload;

    window.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    window.addEventListener('drop', function (e) {
      e.preventDefault();
    });

    this.element.addEventListener('dragover', (e) => {
      if (e.target.classList.contains('user__icon')) {
        if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === 'file') {
          e.preventDefault();
        }
      }
    });

    this.element.addEventListener('drop', (e) => {
      if (e.target.classList.contains('user__icon')) {
        const file = e.dataTransfer.items[0].getAsFile();
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => this.onUpload(reader.result));
        e.preventDefault();
      }
    });
  }

  set(photo) {
    this.element.style.backgroundImage = `url(${photo})`;
  }

  setAvatar(photo) {
    // const myUserName = document.querySelector('.chat__user-name').dataset.name;
    // const userList = this.element.querySelectorAll('.user__icon');
    // for (let user of userList) {
    //   if (user === myUserName) {
    //     user.style.backgroundImage = `url(${photo})`;
    //   }
    // }

    const myUserName = document.querySelector('.chat__user-name').dataset.name;
    const userList = this.element.querySelectorAll('.user__icon');
    console.log(userList);

    for (const user of userList) {
      const userName = user.nextElementSibling.firstElementChild.textContent;
      if (userName === myUserName) {
        user.style.backgroundImage = `url(${photo})`;
      }
    }
  }
}
