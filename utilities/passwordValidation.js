const passwordValidation = function (password) {
  if (password.length >= 5) {
    return true;
  } else {
    return false;
  }
};

export default passwordValidation;
