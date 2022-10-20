import React, { useState, useEffect, useContext } from "react";
import QuestionGroup from "./QuestionGroup";
import blobTwo from "../assets/blob-2.png";
import { QuestionsContext } from "../context/QuestionsContext";

const Main = () => {
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const {
    questions,
    setToggleReset,
    isLoading,
    setIsLoading,
    isCompleted,
    setIsCompleted,
  } = useContext(QuestionsContext);

  function handleCheck() {
    let count = 0;

    questions.forEach((question) => {
      if (question.correctAnswer === question.selectedAnswer) {
        count++;
      }
    });

    setCorrectAnswersCount(count);
    setIsCompleted(true);
  }

  function handleReset() {
    setIsLoading(true);
    setToggleReset((prevState) => !prevState);
  }

  return (
    <div
      className="bgContainerInner w-full min-h-screen"
      style={{ backgroundImage: `url(${blobTwo})` }}
    >
      <div className="w-fit max-w-[90%] px-4 py-10 mx-auto flex flex-col gap-y-6">
        {questions &&
          questions.map((question) => {
            return <QuestionGroup key={question.id} questionId={question.id} />;
          })}

        <div className="text-center mt-2">
          {isCompleted ? (
            <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap">
              <span className="text-primary font-bold">
                You scored {correctAnswersCount}/{questions.length} correct
                answers
              </span>
              <button
                onClick={handleReset}
                className="bg-btnPrimary text-sm text-btnText rounded-2xl px-10 py-2.5"
              >
                {isLoading ? "Loading..." : "Play again"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleCheck}
              className="bg-btnPrimary text-sm text-btnText rounded-2xl px-12 py-3"
            >
              Check answers
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
