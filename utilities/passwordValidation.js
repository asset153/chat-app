const passwordValidation = function (password) {
  if (password.length >= 5) {
    console.log(true);
    return true;
  } else {
    console.log(false);
    return false;
  }
};

export default passwordValidation;
