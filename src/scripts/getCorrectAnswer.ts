import OpenAI from 'openai';
import {IQuestion} from './getQuestion.ts';
import {initialPrompt, questionPrompt} from './prompts.ts';
import {getItem} from '../storage/storage.ts';
export async function getCorrectAnswer(
    question: IQuestion,
): Promise<string>/* : Promise<string>*/ {
  const key = await getItem('session', 'openAIKey');
  if (!key.startsWith('sk-')) {
    alert(`Critical error: key ${key} is not valid`);
    throw new Error('Key is not valid');
  }
  const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true,
  });
  const qPrompt = questionPrompt(question);
  console.log(qPrompt);
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: initialPrompt,
      },
      {
        role: 'user',
        content: qPrompt,
      },
    ],
    model: 'gpt-3.5-turbo',
  });
  console.log(response.choices[0].message.content!);
  return JSON.parse(response.choices[0].message.content!).correctAnswer;
}
