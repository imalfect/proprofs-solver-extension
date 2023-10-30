import {Button, Dialog, DialogClose, Flex, TextField} from '@radix-ui/themes';
import {useEffect, useState} from 'react';
import {unlockKey} from '../scripts/unlockKey.ts';
import {toast} from 'react-hot-toast';
import {events} from '../scripts/solveQuestion.ts';
import {itemExists} from '../storage/storage.ts';

export default function UnlockKey() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const closeDialog = () => {
    document.getElementById('closeUnlockDialogButton')?.click();
  };
  useEffect(() => {
    events.on('refreshKey', () => {
      e();
    });
    // Check if the key exists in local storage
    async function e() {
      const localExists = await itemExists('local', 'openAIKey');
      if (!localExists) {
        setButtonDisabled(true);
      } else {
        // Check if the key is in session storage
        const sessionExists = await itemExists('session', 'openAIKey');
        if (!sessionExists) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
      }
    }
    e();
  }, []);
  return (
    <>
      <h2 className='text-xl font-bold'>Unlock Key</h2>
      <Dialog.Root >
        <Dialog.Trigger>
          <Button
            size={'2'}
            variant={'soft'}
            color={'purple'}
            disabled={buttonDisabled}>
                      Unlock Key
          </Button>
        </Dialog.Trigger>
        <Dialog.Content style={{maxWidth: 350}}>
          <Dialog.Title>
                Unlock Key
          </Dialog.Title>
          <Dialog.Description size="2" mb="4">
                Enter the password to unlock the key.
          </Dialog.Description>
          <Flex direction={'column'} gap="3">
            <TextField.Input
              size="2"
              type="password"
              placeholder={'Password'}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              variant="soft"/>
            {passwordError !== '' ?
                  <p className={'text-red-9 text-sm -mt-2 -mb-1'}>
                        The password is incorrect
                  </p> : ''}
            <Button
              size={'2'}
              variant={'soft'}
              color={'purple'}
              onClick={async () => {
                try {
                  toast(await unlockKey(password));
                  closeDialog();
                  events.emit('refreshKey');
                  setButtonDisabled(true);
                } catch (e) {
                  setPasswordError('The password is incorrect');
                  console.error(e);
                }
              }}
              disabled={password === ''}>
                        Unlock Key
            </Button>
          </Flex>
        </Dialog.Content>
        <DialogClose>
          <Button style={{display: 'none'}} id="closeUnlockDialogButton"/>
          {/* Function call to close it */}
        </DialogClose>
      </Dialog.Root>
    </>

  );
}
