export default function getBrowserLanguage() {
  return navigator.language.split('-')[0];
}
