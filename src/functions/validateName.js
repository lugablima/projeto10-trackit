export default function validateName(name) {
  const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\-']+$/;
  const newStr = name.trim();
  const isValid = newStr.split(" ").every((value) => regex.test(value));
  return isValid;
}