export const checkValidData = (email, password) => {
  //it will return boolean depend on the test
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Passsword is not valid";

  return null;
};
