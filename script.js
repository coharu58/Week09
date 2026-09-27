(function (global) {
  const FIELD_MESSAGES = {
    name: '名前を入力してください',
    email: 'メールアドレスを入力してください',
    password: 'パスワードを入力してください',
    agree: '利用規約に同意してください',
  };

  function validateUserForm({ name, email, password, agree }) {
    const errors = [];

    if (!name || !String(name).trim()) {
      errors.push({ field: 'name', message: FIELD_MESSAGES.name });
    }

    if (!email || !String(email).trim()) {
      errors.push({ field: 'email', message: FIELD_MESSAGES.email });
    } else if (!String(email).includes('@')) {
      errors.push({ field: 'email', message: FIELD_MESSAGES.email });
    }

    if (!password || !String(password).trim()) {
      errors.push({ field: 'password', message: FIELD_MESSAGES.password });
    } else if (String(password).length < 8) {
      errors.push({ field: 'password', message: 'パスワードは8文字以上で入力してください' });
    }

    if (!agree) {
      errors.push({ field: 'agree', message: FIELD_MESSAGES.agree });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  function clearErrorState() {
    document.querySelectorAll('.error-message').forEach((node) => {
      node.textContent = '';
      node.classList.add('hidden');
    });

    document.querySelectorAll('input').forEach((input) => {
      input.setAttribute('aria-invalid', 'false');
    });
  }

  function showFieldError(fieldName, message) {
    const errorNode = document.querySelector(`[data-error-for="${fieldName}"]`);
    const inputNode = document.querySelector(`[name="${fieldName}"]`);

    if (errorNode) {
      errorNode.textContent = message;
      errorNode.classList.remove('hidden');
    }

    if (inputNode) {
      inputNode.setAttribute('aria-invalid', 'true');
    }
  }

  function showFormMessage(type, text) {
    const messageNode = document.getElementById('form-message');
    if (!messageNode) return;

    messageNode.textContent = text;
    messageNode.classList.remove('hidden', 'border-red-200', 'bg-red-50', 'text-red-700', 'border-green-200', 'bg-green-50', 'text-green-700');

    if (type === 'error') {
      messageNode.classList.add('border-red-200', 'bg-red-50', 'text-red-700');
    }

    if (type === 'success') {
      messageNode.classList.add('border-green-200', 'bg-green-50', 'text-green-700');
    }
  }

  function bindForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = {
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
        agree: form.elements.agree.checked,
      };

      const result = validateUserForm(formData);
      clearErrorState();

      if (!result.isValid) {
        showFormMessage('error', '入力内容を確認してください。');
        result.errors.forEach((error) => showFieldError(error.field, error.message));
        return;
      }

      showFormMessage('success', '登録完了!');
      form.reset();
    });
  }

  global.validateUserForm = validateUserForm;

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', bindForm);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateUserForm };
  }
})(typeof window !== 'undefined' ? window : globalThis);
