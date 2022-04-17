import LoginWindow from './ui/loginWindow';
import MainWindow from './ui/mainWindow';
import ModalPhoto from './ui/modalPhoto';
import UserName from './ui/userName';

export default class MyChat {
  constructor() {
    this.ui = {
      loginWindow: new LoginWindow(
        document.querySelector('.auth-window'),
        this.onLogin.bind(this)
      ),
      mainWindow: new MainWindow(document.querySelector('.chat')),
      modalPhoto: new ModalPhoto(document.querySelector('.modal-photo')),
      //?????
      // userName: new UserName(document.querySelector('[data-role=user-name]')),
      userName: new UserName(document.querySelector('.user__nickname')),
    };

    // this.ui.loginWindow.show();
    const burger = this.ui.mainWindow.element.querySelector('.chat__burger');

    burger.addEventListener('click', () => {
      this.ui.modalPhoto.show();
    });
  }

  async onLogin(name) {
    this.ui.loginWindow.hide();
    this.ui.mainWindow.show();
    this.ui.userName.set(name);
  }
}

// export default function myChat() {
//   const authWindow = document.querySelector(".auth-window");
//   const formButton = authWindow.querySelector(".auth-window__form-button");
//   const formInput = authWindow.querySelector(".auth-window__form-input");
//   const photoLoader = document.querySelector(".modal-photo");
//   const burger = document.querySelector(".chat__burger");
//   const close = document.querySelector(".photo-loader__close");

//   formButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     if (!formInput.value) return;

//     const chat = document.querySelector(".chat");
//     authWindow.classList.add("disable");
//     chat.classList.remove("disable");
//   });

//   burger.addEventListener("click", (e) => {
//     photoLoader.classList.remove("disable");
//   });

//   close.addEventListener("click", (e) => {
//     photoLoader.classList.add("disable");
//   });
// }

// export { myChat };
