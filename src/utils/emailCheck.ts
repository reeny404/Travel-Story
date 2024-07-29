const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

export const emailValidCheck = (email: string) => {
  if (pattern.test(email) === false) {
    return true;
  } else {
    return false;
  }
};
