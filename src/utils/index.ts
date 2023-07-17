/**
 * get localStorage data
 * @param {String} key
 */
export function getStorage(key: string) {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
}

/**
 * set
 * @param {String} key
 * @param {all} val
 */
export function setStorage(key: string, val: any) {
  return localStorage.setItem(key, JSON.stringify(val));
}
export function removeStorage(key: string) {
  return localStorage.removeItem(key);
}
