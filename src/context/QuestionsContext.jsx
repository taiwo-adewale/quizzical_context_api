import React, { useState, useEffect, createContext } from "react";
import arrayShuffle from "array-shuffle";

export const QuestionsContext = createContext(null);

export const QuestionsContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState(null);
  const [toggleReset, setToggleReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetch(
      "https://the-trivia-api.com/api/questions?categories=science,music,sport_and_leisure,society_and_culture,general_knowledge,food_and_drink,film_and_tv&limit=10&region=NG&difficulty=easy"
    )
      .then((res) => res.json())
      .then((data) => {
        // get the correct answer and incorrect answers into one array, shuffle the array and add a selected answer property to each question
        let result = data.map((result) => {
          return {
            id: result.id,
            question: result.question,
            correctAnswer: result.correctAnswer,
            answers: arrayShuffle([
              result.correctAnswer,
              ...result.incorrectAnswers,
            ]),
            selectedAnswer: "",
          };
        });

        setQuestions(result);
        setIsLoading(false);
        setIsCompleted(false);

        window.scrollTo(0, 0);
      });
  }, [toggleReset]);

  const value = {
    questions,
    setQuestions,
    setToggleReset,
    isLoading,
    setIsLoading,
    isCompleted,
    setIsCompleted,
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};
