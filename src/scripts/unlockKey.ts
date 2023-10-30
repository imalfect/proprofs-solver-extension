import {decrypt} from '../storage/cryptography.ts';
import {getItem, setItem} from '../storage/storage.ts';

export async function unlockKey(password: string): Promise<string> {
  const key = await getItem('local', 'openAIKey');
  const decryptedKey = decrypt(key, password);
  setItem('session', 'openAIKey', decryptedKey);
  return 'Key updated successfully';
}
