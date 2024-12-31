"use client";
import React, { useState, useEffect } from "react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "What is 5 + 3?",
    options: ["5", "8", "12", "10"],
    correctAnswer: "8",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Thailand", "Korea"],
    correctAnswer: "Japan",
  },
  {
    question: "What is the boiling point of water at sea level in degrees Celsius?",
    options: ["90", "100", "110", "120"],
    correctAnswer: "100",
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Mark Twain",
      "Jane Austen",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "Which is the smallest continent by land area?",
    options: ["Europe", "Antarctica", "Australia", "South America"],
    correctAnswer: "Australia",
  },
];

const QuizGame: React.FC = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Lấy 5 câu hỏi ngẫu nhiên từ danh sách
    const shuffled = [...questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setShuffledQuestions(shuffled);
  }, []);

  if (shuffledQuestions.length === 0) {
    return <div className="text-center text-white">Loading questions...</div>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleAnswerClick = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      setGameOver(true);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://source.unsplash.com/random/1920x1080/?nature")`,
      }}
    >
      <div className="w-full max-w-lg p-6 bg-white/90 rounded-lg shadow-lg">
        {gameOver ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Over</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your score: {score}/{shuffledQuestions.length}
            </p>
            <button
              onClick={() => {
                setGameOver(false);
                setCurrentQuestionIndex(0);
                setScore(0);
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {currentQuestion.question}
            </p>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className={`w-full px-4 py-2 border rounded-lg transition ${
                    selectedAnswer === option
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className="w-full mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
            >
              {currentQuestionIndex + 1 < shuffledQuestions.length
                ? "Next Question"
                : "Finish Game"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
