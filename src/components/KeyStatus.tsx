import Annotation from './Annotation.tsx';
import React, {useEffect, useState} from 'react';
import {RadixColors} from '../types/radix.ts';
import {itemExists} from '../storage/storage.ts';
import {CrossCircledIcon,
  ExclamationTriangleIcon,
  CheckIcon} from '@radix-ui/react-icons';
import {events} from '../scripts/solveQuestion.ts';
interface IAnnotationParams {
    color: RadixColors;
    description: string;
    icon: React.ReactNode;
}
export default function KeyStatus() {
  const [annotationParams, setAnnotationParams] = useState<IAnnotationParams>({
    color: 'red',
    description: 'Loading...',
    icon: <CrossCircledIcon/>,
  });
  useEffect(() => {
    events.on('refreshKey', () => {
      e();
    });
    // Check if the key exists in local storage
    async function e() {
      const localExists = await itemExists('local', 'openAIKey');
      if (!localExists) {
        setAnnotationParams({
          color: 'red',
          description: 'Configure your OpenAI Key to use the extension.',
          icon: <CrossCircledIcon/>,
        });
      } else {
        // Check if the key is in session storage
        const sessionExists = await itemExists('session', 'openAIKey');
        if (!sessionExists) {
          setAnnotationParams({
            color: 'yellow',
            description: 'Unlock the API key.',
            icon: <ExclamationTriangleIcon/>,
          });
        } else {
          setAnnotationParams({
            color: 'green',
            description: 'Extension is ready to use.',
            icon: <CheckIcon/>,
          });
        }
      }
    }
    e();
  }, []);
  return (
    <Annotation
      color={annotationParams.color}
      icon={annotationParams.icon}>
      {annotationParams.description}
    </Annotation>
  );
}
