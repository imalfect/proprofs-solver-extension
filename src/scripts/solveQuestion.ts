import {getQuestion} from './getQuestion.ts';
import {getCorrectAnswer} from './getCorrectAnswer.ts';
import EventEmitter from 'eventemitter3';
export const events = new EventEmitter();

export async function solveQuestion() {
  updateStatus('Fetching the question');
  const question = await getQuestion();
  updateStatus(`Predicting the correct answer`);
  updateQuestion(question.question);
  const correctAnswer = await getCorrectAnswer(question);
  updateAnswer(correctAnswer);
  updateStatus(`Success! Check the answer!`);
  console.log(`Correct answer: ${correctAnswer}`);
  setTimeout(() => {
    updateStatus(`idle`);
  }, 3000);
  /* switch (correctAnswer) {
    case 'A':
      document.getElementById('answerA')?.click();
      break;
    case 'B':
      document.getElementById('answerB')?.click();
      break;
    case 'C':
      document.getElementById('answerC')?.click();
      break;
    case 'D':
      document.getElementById('answerD')?.click();
      break;
  }*/
}

function updateQuestion(update: string) {
  events.emit('question', update);
}
function updateAnswer(update: string) {
  events.emit('answer', update);
}
function updateStatus(update: string) {
  events.emit('status', update);
}
