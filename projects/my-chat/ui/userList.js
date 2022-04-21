export default class UserList {
  constructor(element) {
    this.element = element;
    this.items = new Set();
  }

  buildUserList() {
    const fragment = document.createDocumentFragment();

    this.element.innerHTML = '';

    for (const name of this.items) {
      const element = document.createElement('li');
      element.classList.add('chat__users-item', 'user');
      element.innerHTML = `
      <div class="user__icon">
      <img
      class="user__avatar"
      src="projects/my-chat/photos/${name}.png"
      alt="аватар"
      />
      </div>
      <div class="user__info">
      <div class="user__nickname">${name}</div>
      <div class="user__last-message"></div>
      </div>
      `;

      fragment.append(element);
    }
    this.element.append(fragment);

    const chatHeader = document.querySelector('.chat__header-info');

    chatHeader.innerHTML = `Колличество участников : ${this.items.size}`;
  }

  UpdateUserList(name, lastMessage) {
    const usersColl = this.element.querySelectorAll('.user__nickname');

    for (const user of usersColl) {
      if (user.textContent === name) {
        user.nextElementSibling.textContent = lastMessage;
      }
    }
  }

  add(name) {
    this.items.add(name);
    this.buildUserList();
  }

  remove(name) {
    this.items.delete(name);
    this.buildUserList();
  }
}
