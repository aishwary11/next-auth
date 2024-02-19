import CryptoJS from 'crypto-js';
const secretKey = process.env.ENCRYPT_SECRET_KEY;
export const encryptData = (data: string) => CryptoJS.AES.encrypt(data, secretKey!).toString();
export const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey!);
  return bytes.toString(CryptoJS.enc.Utf8);
}

