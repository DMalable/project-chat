export default class MessageSender {
  constructor(element, onSend) {
    this.onSend = onSend;
    this.messageInput = element.querySelector('.chat__footer-input');
    this.messageSendButton = element.querySelector('.chat__footer-button');

    const makeSend = () => {
      const message = this.messageInput.value.trim();

      if (message) {
        this.onSend(message);
      }
    };

    this.messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        makeSend();
      }
    });

    this.messageSendButton.addEventListener('click', (e) => {
      e.preventDefault();
      makeSend();
    });
  }

  clear() {
    this.messageInput.value = '';
  }
}
