export interface IQuestion {
    question: string;
    a: string;
    b: string;
    c: string;
    d: string;
}
const getQuestionInnerHTML = () => {
  return document.getElementById('question-desc-align')!.innerHTML;
};
const getAnswersInnerHTML = () => {
  const a = document.getElementsByClassName('final_span_width');
  const result = [];
  for (const answer of a) {
    result.push(answer.innerHTML);
  }
  return result;
};
export function getQuestion(): Promise<IQuestion> {
  return new Promise((resolve) => {
    let question;
    let answers;

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      console.log('Execute Script');
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id as number},
        func: getQuestionInnerHTML,
      }, (resultQuestion) => {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id as number},
          func: getAnswersInnerHTML,
        }, (resultAnswers) => {
          question = resultQuestion[0].result;
          answers = resultAnswers[0].result;

          console.log(`Question: ${question}`);

          resolve({
            question: question,
            a: answers[0],
            b: answers[1],
            c: answers[2],
            d: answers[3],
          });
        });
      });
    });
  });
}
