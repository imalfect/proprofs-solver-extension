// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import aes256 from 'aes256';
export function encrypt(value: string, pass: string): string {
  return aes256.encrypt(pass, value);
}

export function decrypt(value: string, pass: string): string {
  console.log(value);
  const decryptedValue = aes256.decrypt(pass, value);
  console.log(decryptedValue);
  // Check if the value is valid
  const regex = new RegExp('^sk-[a-zA-Z0-9]{32,}$');
  if (!regex.test(decryptedValue)) {
    throw new Error('Invalid key');
  } else {
    return decryptedValue;
  }
}
