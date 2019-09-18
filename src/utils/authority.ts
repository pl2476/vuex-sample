// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuth(str?: string): string {
  // return localStorage.getItem('auth');
  const auth = typeof str === 'undefined' ? localStorage.getItem('auth') : str;
  // authorityString could be string
  let tempAuth;
  try {
    if (auth) {
      tempAuth = JSON.parse(auth);
    }
  } catch (e) {
    tempAuth = auth;
  }
  if (typeof tempAuth === 'string') {
    return tempAuth;
  }
  return tempAuth;
}

export function setAuth(auth: string): void {
  return localStorage.setItem('auth', auth);
}
