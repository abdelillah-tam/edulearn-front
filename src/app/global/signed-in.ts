export function isSignedIn() {
  if (
    Boolean(sessionStorage.getItem('signed')) &&
    sessionStorage.getItem('user')
  ) {
    return true;
  }

  return false;
}
