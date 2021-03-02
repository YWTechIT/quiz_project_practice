// app.js
import React, { useState } from "react";
import "./App.css";

const Quiz = [
  {
    id: 1,
    question: "현재 네이버 CEO 이름은?",
    answers: [
      { text: "한성숙", isTrue: true },
      { text: "김범수", isTrue: false },
      { text: "김봉진", isTrue: false },
      { text: "김범석", isTrue: false },
    ],
  },
  {
    id: 2,
    question: "네이버의 설립 연도는?",
    answers: [
      { text: "2002년", isTrue: false },
      { text: "2001년", isTrue: false },
      { text: "2000년", isTrue: false },
      { text: "1999년", isTrue: true },
    ],
  },
  {
    id: 3,
    question: "네이버의 본사 위치는?",
    answers: [
      { text: "경기도 화성시 능동", isTrue: false },
      { text: "경기도 성남시 분당구", isTrue: true },
      { text: "충청남도 공주시 조평리", isTrue: false },
      { text: "제주특별자치도 제주시 애월읍", isTrue: false },
    ],
  },
];

const App = () => {
  const [currentText, setCurrentText] = useState(0);
  const [resultPage, setResultPage] = useState(false);
  const [score, setScore] = useState(0);
  const convertScore = Math.floor((score / Quiz.length) * 100)

  const handleClick = (isTrue) => {
    if (isTrue === true) {
      setScore((score) => score + 1)
      alert("정답이에요 👏🏽👏🏽");
    } else {
      alert("오답이에요 👏🏽👏🏽");
    }

    if (currentText === Quiz.length - 1) {
      setResultPage(true);
    } else {
      setCurrentText((currentText) => currentText + 1);
    }
  };

  return (
    <div className="container">
      {
      resultPage === true 
      ? (
        <div className='app'>
          <h1 className='result-header'>최종 점수는?</h1>
          <p className='result-score'>{convertScore}</p>
        </div>) 
      : (
        <div className="app">
          <div className="question-section">
            <h1 className="question-header">
              <span>{Quiz[currentText].id}</span>/{Quiz.length}
            </h1>
            <div className="question-text">{Quiz[currentText].question}</div>
          </div>
          <div className="answer-section">
            {Quiz[currentText].answers.map((answer) => (
              <button
                key={Quiz.id}
                value={Quiz.text}
                onClick={() => handleClick(answer.isTrue)}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
