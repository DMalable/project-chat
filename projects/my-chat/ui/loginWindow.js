export default class LoginWindow {
  constructor(element, onLogin) {
    this.element = element;
    this.onLogin = onLogin;

    const loginNameInput = element.querySelector('.auth-window__form-input');
    const submitButton = element.querySelector('.auth-window__form-button');
    // const loginError = element.querySelector('[data-role=login-error]');

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      // loginError.textContent = '';

      const name = loginNameInput.value.trim();

      // if (!name) {
      if (name) {
        // loginError.textContent = 'Введите никнейм';
        // } else {
        this.onLogin(name);
      }
    });
  }

  show() {
    this.element.classList.remove('disable');
  }

  hide() {
    this.element.classList.add('disable');
  }
}
