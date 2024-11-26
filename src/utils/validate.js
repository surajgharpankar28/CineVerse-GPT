export const checkValidData = (email, password) => {
  // Email Validation (checks for standard email format)
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  // Password Validation (at least 8 characters, contains lowercase, uppercase, and number)
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
    password
  );

  // Return appropriate error messages or null if both are valid
  if (!isEmailValid) return "Please enter a valid email address.";
  if (!isPasswordValid)
    return "Password must be at least 8 characters long, contain both uppercase and lowercase letters, and a number.";

  return null; // Return null if both are valid
};
