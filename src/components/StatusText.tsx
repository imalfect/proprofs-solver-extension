interface IStatusTextProps {
    status: string;
    question: string;
    answer: string;
}
export default function StatusText(props: IStatusTextProps) {
  return (
    <div className="mt-3">
      <p className="text-xl">Status:&nbsp;
        <span className={'font-bold text-purple-9'}>
          {props.status}
        </span>
      </p>
      <div>
        <p className="text-xl">
                    Question:&nbsp;
          <span className={'font-bold text-purple-9'}>
            {props.question}
          </span>
        </p>
        <p className="text-xl">
                    Correct answer:&nbsp;
          <span className={'font-bold text-purple-9'}>
            {props.answer}
          </span>
        </p>
      </div>
    </div>
  );
}
