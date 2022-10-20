import React, { useContext } from "react";
import { QuestionsContext } from "../context/QuestionsContext";

const Option = ({ option, isSelected, questionId, optionState }) => {
  const { setQuestions } = useContext(QuestionsContext);

  function checkOptionState() {
    if (!optionState) {
      return isSelected ? "selected" : "initial";
    } else {
      return optionState;
    }
  }

  const handleSelection = () => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        return question.id === questionId
          ? { ...question, selectedAnswer: option }
          : question;
      });
    });
  };

  return (
    <div onClick={handleSelection} className={checkOptionState()}>
      <span className="text-[13px] text-primary font-medium leading-loose">
        {option}
      </span>
    </div>
  );
};

export default Option;
