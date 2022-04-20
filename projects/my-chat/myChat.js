import LoginWindow from './ui/loginWindow';
import MainWindow from './ui/mainWindow';
import ModalPhoto from './ui/modalPhoto';
import UserName from './ui/userName';
import UserList from './ui/userList';
import MessageList from './ui/messageList';
import MessageSender from './ui/messageSender';
import WSClient from './wsClient';

export default class MyChat {
  constructor() {
    this.wsClient = new WSClient(
      `ws://${location.host}/my-chat/ws`,
      this.onMessage.bind(this)
    );

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
      //!!!!!!!!!!!!!!!!
      // userList: new UserList(document.querySelector('[data-role=user-list]')),
      userList: new UserList(document.querySelector('.chat__users-list')),
      messageList: new MessageList(document.querySelector('.chat__history')),
      messageSender: new MessageSender(
        document.querySelector('.chat__footer-form'),
        this.onSend.bind(this)
      ),
    };

    // this.ui.loginWindow.show();
    const burger = this.ui.mainWindow.element.querySelector('.chat__burger');

    burger.addEventListener('click', () => {
      this.ui.modalPhoto.show();
    });
  }
  ///!!!!!!!!!!!!!
  onSend(message) {
    this.wsClient.sendTextMessage(message);
    this.ui.messageSender.clear();
  }

  async onLogin(name) {
    await this.wsClient.connect();
    this.wsClient.sendHello(name);
    this.ui.loginWindow.hide();
    this.ui.mainWindow.show();
    this.ui.userName.set(name);
  }

  onMessage({ type, from, data }) {
    if (type === 'hello') {
      this.ui.userList.add(from);
    } else if (type === 'user-list') {
      for (const item of data) {
        this.ui.userList.add(item);
      }
    } else if (type === 'bye-bye') {
      this.ui.userList.remove(from);
    } else if (type === 'text-message') {
      const chatHistory = this.ui.mainWindow.element.querySelector('.chat__history');
      let lastUserMsg = '';
      const isFirstMsg = !chatHistory.firstElementChild;
      if (!isFirstMsg) {
        lastUserMsg = chatHistory.lastElementChild.querySelector('.messages__name')
          .textContent;
      }
      const isNewGroup = from !== lastUserMsg || isFirstMsg;
      this.ui.messageList.add(from, data.message, isNewGroup);
      this.ui.userList.UpdateUserList(from, data.message);
    }
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
