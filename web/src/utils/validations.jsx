export function isURL(value) {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
}