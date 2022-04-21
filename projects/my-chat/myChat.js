import LoginWindow from './ui/loginWindow';
import MainWindow from './ui/mainWindow';
import ModalPhoto from './ui/modalPhoto';
import UserName from './ui/userName';
import MyUserName from './ui/myUserName';
import UserList from './ui/userList';
import UserPhoto from './ui/userPhoto';
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
      myUserName: new MyUserName(document.querySelector('.chat__user-name')),
      userName: new UserName(document.querySelector('.user__nickname')),
      userList: new UserList(document.querySelector('.chat__users-list')),
      messageList: new MessageList(document.querySelector('.chat__history')),
      messageSender: new MessageSender(
        document.querySelector('.chat__footer-form'),
        this.onSend.bind(this)
      ),
      //!!!!!!!!!!!!!!!!!!!!
      userPhoto: new UserPhoto(
        //!!!!!!!!!!!!!!!!!!!!!!!!
        document.querySelector('.chat__users-list'),
        this.onUpload.bind(this)
      ),
    };

    const burger = this.ui.mainWindow.element.querySelector('.chat__burger');

    burger.addEventListener('click', () => {
      this.ui.modalPhoto.show();
    });
  }

  onUpload(data) {
    this.ui.userPhoto.set(data);

    fetch('/my-chat/upload-photo', {
      method: 'post',
      body: JSON.stringify({
        name: this.ui.userName.get(),
        image: data,
      }),
    });
  }

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
    this.ui.myUserName.set(name);
    console.log(`/my-chat/photos/${name}.png?t=${Date.now()}`);
    this.ui.userPhoto.set(`/my-chat/photos/${name}.png?t=${Date.now()}`);
    // this.ui.userPhoto.set(`/my-chat/photos/${name}.png`);
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
      //!!!!!!!!!!!!!!!!!!!!!!
    } else if (type === 'photo-changed') {
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const avatars = document.querySelectorAll(`.messages__avatar`);

      for (const avatar of avatars) {
        avatar.style.backgroundImage = `url(/my-chat/photos/${
          data.name
        }.png?t=${Date.now()})`;
      }
    }
  }
}
