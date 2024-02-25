import axios from 'axios';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import constant from '../constant';
const secretKey: string = process.env.ENCRYPT_SECRET_KEY || '2fa751fa7c9bf4bf5dfe1c56622cc89b';
export const encryptData = (data: string) => CryptoJS.AES.encrypt(data, secretKey).toString();
export const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey!);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const toastSuccess = (msg: string): React.ReactText => toast.success(msg);
export const toastError = (msg: string): React.ReactText => toast.error(msg);

export const axiosInstance = axios.create({ baseURL: constant.baseURL, timeout: constant.axiosTimeOut, cancelToken: axios.CancelToken.source().token });
