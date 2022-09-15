const emailValidation = function (email) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  regex.test(email);

  if (regex.test(email)) {
    console.log(true);
    return true;
  } else {
    console.log(false);
    return false;
  }
};

export default emailValidation;
