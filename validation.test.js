const { validateUserForm } = require('./script.js');

const validInput = {
  name: '山田太郎',
  email: 'taro@example.com',
  password: 'password123',
  agree: true,
};

const resultValid = validateUserForm(validInput);
if (resultValid.isValid) {
  console.log('valid case passed');
} else {
  console.error('valid case failed', resultValid.errors);
  process.exit(1);
}

const invalidInput = {
  name: '',
  email: 'bad-email',
  password: 'short',
  agree: false,
};

const resultInvalid = validateUserForm(invalidInput);
if (!resultInvalid.isValid) {
  const messages = resultInvalid.errors.map((error) => error.message);
  const expected = [
    '名前を入力してください',
    'メールアドレスを入力してください',
    'パスワードは8文字以上で入力してください',
    '利用規約に同意してください',
  ];

  const hasExpected = expected.every((text) => messages.includes(text));
  if (hasExpected) {
    console.log('invalid case passed');
  } else {
    console.error('invalid case failed', messages);
    process.exit(1);
  }
} else {
  console.error('invalid case unexpectedly passed');
  process.exit(1);
}
