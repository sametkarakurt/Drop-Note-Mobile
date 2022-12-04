export const ValidateEmail = (input) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

export const CheckPassword = (input) => {
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (input.match(passw)) {
    return true;
  } else {
    return false;
  }
};

export const CheckSamePassword = (password1, password2) => {
  if (password1 === password2) {
    return true;
  } else {
    return false;
  }
};
