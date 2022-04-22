import { sanitize } from '../utils';

export default class MessageList {
  constructor(element) {
    this.element = element;
  }

  add(from, text, isNewGroup) {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, 0);
    const minutes = String(date.getMinutes()).padStart(2, 0);
    const time = `${hours}:${minutes}`;
    // if get new group - add message group, else add message in group
    if (isNewGroup) {
      const item = document.createElement('div');
      const myUserName = document.querySelector('.chat__user-name').dataset.name;
      item.classList.add('chat__message-group', 'messages');
      if (from === myUserName) {
        item.classList.add('messages--self-message');
      }
      item.innerHTML = `
        <div class="messages__icon" 
        style="background-image: url(/my-chat/photos/${from}.png?t=${Date.now()});">
        </div>
        <div class="messages__info">
        <div class="messages__name">${sanitize(from)}</div>
        <ul class="messages__list">
          <li class="messages__item">
            <div class="messages__item-content">
              <p class="message__text">${sanitize(text)}</p>
              <div class="message__time">${time}</div>
            </div>
          </li>
        </ul>
        </div>
        `;
      this.element.append(item);
    } else {
      const item = document.createElement('div');
      item.classList.add('messages__item');
      item.innerHTML = `
            <div class="messages__item-content">
              <p class="message__text">${sanitize(text)}</p>
              <div class="message__time">${time}</div>
            </div>
        `;
      this.element.lastElementChild.querySelector('.messages__list').append(item);
    }
  }
}
