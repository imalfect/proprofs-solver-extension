import {Button, Flex} from '@radix-ui/themes';
import {PlayIcon, SymbolIcon} from '@radix-ui/react-icons';
import {useReward} from 'react-rewards';
import {useEffect, useState} from 'react';
import StatusText from './StatusText.tsx';
import {events, solveQuestion} from '../scripts/solveQuestion';
import KeyStatus from './KeyStatus.tsx';
import {itemExists} from '../storage/storage.ts';
import {toast} from 'react-hot-toast';
export default function RunProgram() {
  const [status, setStatus] = useState('idle');
  const [question, setQuestion] = useState('N/A');
  const [answer, setAnswer] = useState('N/A');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {reward} = useReward('rewardId', 'confetti', {
    elementCount: 40,
    colors: [
      '#AB4ABA',
      '#53B365',
    ],
  });
  useEffect(() => {
    checkKeyStatus();
    events.on('status', (status: string) => {
      setStatus(status);
    });
    events.on('question', (question: string) => {
      setQuestion(question);
    });
    events.on('answer', (answer: string) => {
      reward();
      setAnswer(answer);
    });
  });
  const checkKeyStatus = async () => {
    const localExists = await itemExists('local', 'openAIKey');
    if (!localExists) {
      setButtonDisabled(true);
    } else {
      // Check if the key is in session storage
      const sessionExists = await itemExists('session', 'openAIKey');
      if (!sessionExists) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }
  };
  return (
    <section className="mt-3">
      <h2 className='text-xl font-bold'>Run the script</h2>
      <p className='text-lg mb-3'>
          When you're on the question page, click the Solve button
          and wait for the answer to appear.ss
      </p>
      <KeyStatus/>
      <div className='mt-3'>
        <Flex direction={'row'} gap="3" justify="center">
          <Button
            size="2"
            variant="soft"
            color="green"
            id="rewardId"
            disabled={buttonDisabled || status !== 'idle' }
            onClick={() => {
              setQuestion('N/A');
              setAnswer('N/A');
              setStatus('Fetching the question...');
              solveQuestion();
            }}>
            <PlayIcon/> Solve
          </Button>
          {buttonDisabled ? <Button
            size="2"
            variant="soft"
            color="yellow"
            id="rewardId"
            className="ml-2"
            onClick={() => {
              checkKeyStatus();
              events.emit('refreshKey');
              toast.success('Key refreshed!');
            }}>
            <SymbolIcon/> Refresh the key
          </Button> : ''}
        </Flex>
      </div>
      <StatusText status={status} question={question} answer={answer}/>
    </section>
  );
}
