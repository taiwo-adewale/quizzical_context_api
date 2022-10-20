import React, { useContext } from "react";
import { nanoid } from "nanoid";
import Option from "./Option";
import { QuestionsContext } from "../context/QuestionsContext";

const QuestionGroup = ({ questionId }) => {
  const { questions, isCompleted } = useContext(QuestionsContext);

  let question = questions.filter((ques) => questionId === ques.id);
  question = question[0];

  function checkAnswer(ans) {
    if (question.selectedAnswer === "") {
      return "greyed-out";
    } else if (
      question.correctAnswer === ans &&
      question.selectedAnswer !== ""
    ) {
      return "correct";
    } else if (
      question.correctAnswer !== ans &&
      question.selectedAnswer === ans
    ) {
      return "wrong";
    } else {
      return "greyed-out";
    }
  }

  return (
    <div className="w-full border-b border-b-[#DBDEF0]">
      <h3 className="text-primary font-bold text-[18px] mb-3.5">
        {question.question}
      </h3>

      <div className="flex flex-wrap gap-x-3 gap-y-2 mb-6">
        {question.answers.map((ans) => {
          return (
            <Option
              key={nanoid()}
              option={ans}
              questionId={questionId}
              isSelected={question.selectedAnswer === ans ? true : false}
              optionState={isCompleted ? checkAnswer(ans) : null}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionGroup;
