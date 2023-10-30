/* eslint-disable max-len */
import {IQuestion} from './getQuestion.ts';
export const initialPrompt = `
You are a professor. You will be asked questions in the following format:

Q: [question here]

A: [answer a]
B: [answer b]
C: [answer c]
D: [answer d]

Explain: [true/false]
Your task is to provide the following response for each question asked like that, DO NOT reply with any text, your only output will be a code block containing a JSON with the following format
{
correctAnswer: x,
explanation: (insert explanation here ONLY IF EXPLAIN WAS TRUE IN THE PROMPT)
}`;

export function questionPrompt(question: IQuestion): string {
  return `
    Q: ${question.question}
    A: ${question.a}
    B: ${question.b}
    C: ${question.c}
    D: ${question.d}
    Explain: FALSE`;
}
