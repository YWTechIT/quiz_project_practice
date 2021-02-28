import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [currentNo, setCurrentNo] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const Quiz = [
    {
      id: 1,
      question: "현재 네이버 CEO 이름은?",
      answers: [
        { text: "한성숙", isCorrect: true },
        { text: "김범수", isCorrect: false },
        { text: "김봉진", isCorrect: false },
        { text: "김범석", isCorrect: false },
      ],
    },
    {
      id: 2,
      question: "네이버의 설립 연도는?",
      answers: [
        { text: "2002년", isCorrect: false },
        { text: "2001년", isCorrect: false },
        { text: "2000년", isCorrect: false },
        { text: "1999년", isCorrect: true },
      ],
    },
    {
      id: 3,
      question: "네이버의 본사 위치는?",
      answers: [
        { text: "경기도 화성시 능동", isCorrect: false },
        { text: "경기도 성남시 분당구", isCorrect: true },
        { text: "충청남도 공주시 조평리", isCorrect: false },
        { text: "제주특별자치도 제주시 애월읍", isCorrect: false },
      ],
    },
  ];
  const convertScore = parseInt(score/Quiz.length * 100);

  const handleClick = (isCorrect) => {
    if (isCorrect) {
      alert("정답입니다.");
      setScore((score) => score + 1);
    } else {
      alert("오답입니다.");
    }

    if (currentNo === Quiz.length - 1) {
      setShowResult(true);
    } else {
      setCurrentNo((currentNo) => currentNo + 1);
    }
  };

  return (
    <div className="container">
      {showResult ? (
        <div className="app">
          <h1 class="result-header">당신의 점수는?</h1>
          <p class="result-score">{convertScore}</p>
        </div>
      ) : (
        <div className="app">
          <div className="question-section">
            <h1 className="question-header">
              <span>{Quiz[currentNo].id}</span>/{Quiz.length}
            </h1>
            <div className="question-text">{Quiz[currentNo].question}</div>
          </div>
          <div className="answer-section">
            {Quiz[currentNo].answers.map((answers) => (
              <button
                value={answers.text}
                onClick={() => {
                  handleClick(answers.isCorrect);
                }}
              >
                {answers.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
