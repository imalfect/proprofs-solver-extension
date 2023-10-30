import {encrypt} from '../storage/cryptography.ts';
import {setItem} from '../storage/storage.ts';

export async function updateKey(
    key: string,
    password: string):
    Promise<string> {
  console.log('Updating key' +
      '\nPassword: ' + password);
  const encryptedKey = encrypt(key, password);
  setItem('local', 'openAIKey', encryptedKey);
  return 'Key updated successfully';
}
