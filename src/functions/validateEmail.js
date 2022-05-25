export default function validateEmail(email) {
  return email.endsWith(".com") || email.endsWith(".br") || email.endsWith(".uol");
}

// export default function validateEmail(email) {
//   const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   return regex.test(email);
// }
