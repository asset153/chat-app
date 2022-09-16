const repeatPasswordValidation = function (password, repeatPassword) {
  if (password === repeatPassword && repeatPassword.length) {
    return true;
  } else {
    return false;
  }
};

export default repeatPasswordValidation;
