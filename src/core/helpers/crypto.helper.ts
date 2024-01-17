import * as crypto from 'crypto';
import { ModeOfOperation, Counter, utils } from 'aes-js';
import { compare, hash } from 'bcrypt';

const saltRound = 15;
// TOFO: should be in env
const key = [33, 22, 25, 47, 78, 61, 60, 64, 24, 46, 64, 52, 70, 40, 65, 27];

export const getRandomString = (length: number): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const getHash = async (password: string): Promise<string> => {
  return hash(password, saltRound);
};

export const compareHash = async (
  plainPassword: string,
  hashPassword: string,
): Promise<boolean> => {
  return compare(plainPassword, hashPassword);
};

export const encrypt = (text: string): string => {
  const textBytes = utils.utf8.toBytes(text);
  const aesCtr = new ModeOfOperation.ctr(key, new Counter(saltRound));
  const encryptedBytes = aesCtr.encrypt(textBytes);
  return utils.hex.fromBytes(encryptedBytes);
};

export const decrypt = (encryptText: string): string => {
  const encryptedBytes = utils.hex.toBytes(encryptText);
  const aesCtr = new ModeOfOperation.ctr(key, new Counter(saltRound));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  return utils.utf8.fromBytes(decryptedBytes);
};
