import CryptoJS from 'crypto-js';
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

export const encryptPassword = (password: string): string => {
  const key = '9a3b8c2e7f6d5g4h';
  console.log(key, 'key');
  const encryptedPassword = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(password),
    CryptoJS.enc.Utf8.parse(key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    },
  ).ciphertext;
  return encryptedPassword.toString(CryptoJS.enc.Base64);
};
