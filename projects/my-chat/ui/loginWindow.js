export default class LoginWindow {
  constructor(element, onLogin) {
    this.element = element;
    this.onLogin = onLogin;

    const loginNameInput = element.querySelector('.auth-window__form-input');
    const submitButton = element.querySelector('.auth-window__form-button');

    const makeLogin = () => {
      const name = loginNameInput.value.trim();

      if (name) {
        this.onLogin(name);
      }
    };

    loginNameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        makeLogin();
      }
    });

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      makeLogin();
    });
  }

  show() {
    this.element.classList.remove('disable');
  }

  hide() {
    this.element.classList.add('disable');
  }
}
