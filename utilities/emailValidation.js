const emailValidation = function (email) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  regex.test(email);

  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
};

export default emailValidation;
