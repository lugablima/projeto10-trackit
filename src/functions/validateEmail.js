export default function validateEmail(email) {
  return email.endsWith(".com") || email.endsWith(".br") || email.endsWith(".uol");
}