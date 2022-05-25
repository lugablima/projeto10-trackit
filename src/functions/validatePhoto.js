function validateURL(strURL) {
  let res = strURL?.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

function validateStartURL(stringURL) {
  const condicionStartsWith = stringURL.startsWith("http://") || stringURL.startsWith("https://");
  return condicionStartsWith;
}

export default function validatePhoto(url) {
  const newURL = url.trim();
  if (validateURL(newURL) && validateStartURL(newURL)) {
    return true;
  }
  return false;
}