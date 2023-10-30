import {Button, TextField} from '@radix-ui/themes';
import {useState} from 'react';
import {toast} from 'react-hot-toast';
import {updateKey} from '../scripts/updateKey.ts';
export default function ConfigureKey() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [key, setKey] = useState('');
  const [keyError, setKeyError] = useState('');
  const saveKey = () => {
    updateKey(key, password);
    toast.success('Key saved!');
  };
  return (
    <section className="mt-3">
      <h2 className='text-xl font-bold'>Configure OpenAI Key</h2>
      <p className='text-lg mb-3'>
            You can get your OpenAI Key from <a href='https://beta.openai.com/account/api-keys' className="text-purple-9">here</a>.
      </p>
      <div className="max-w-xs mx-auto">
        <TextField.Input
          size="2"
          placeholder={'OpenAI Key'}
          onChange={(event) => {
            const regex = new RegExp('^sk-[a-zA-Z0-9]{32,}$');
            if (regex.test(event.target.value)) {
              setKey(event.target.value);
              setKeyError('');
            } else {
              setKey('');
              setKeyError('The key is invalid');
            }
          }}
        />
        {keyError !== '' ?
            <p className={'text-red-9 text-sm'}>
                The key is invalid
            </p> : ''}
        <div style={{maxWidth: 150}} className='mx-auto mt-2'>
          <TextField.Input
            onChange={(event) => {
              if (event.target.value.length < 8) {
                setPasswordError(
                    'Password must be at least 8 characters long!',
                );
                setPassword('');
              } else {
                setPasswordError('');
                setPassword(event.target.value);
              }
            }}
            size="2"
            type="password"
            placeholder={'Password'}
            variant="soft"/>
        </div>
        {passwordError !== '' ?
            <p className={'text-red-9 text-sm'}>
                The password must be at least 8 characters long!
            </p> : ''
        }
      </div>
      {/* <div className="mt-2">
        <Select.Root defaultValue="gpt-3-5">
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Language Models</Select.Label>
              <Select.Item value="gpt-3-5">ChatGPT (GPT-3.5-Turbo)</Select.Item>
              <Select.Item value="gpt-4">GPT-4</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>*/}

      <div className={'mt-3 mb-3'}>
        <Button
          size="2"
          variant="soft"
          onClick={() => {
            saveKey();
          }}
          disabled={password === '' || key === ''}>
                Save Key
        </Button>
      </div>
    </section>
  );
}
