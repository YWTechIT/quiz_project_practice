## 📍 간단한 퀴즈 앱 만들기(1주차) 복습
전체적인 윤곽 짜기

### 1️⃣ 간단한 컴포넌트 만들기
`App`함수는 `React`에서 사용하는 하나의 큰 컴포넌트이고, `return()`에 우리가 화면에 그리고자 하는 `html`을 작성하면 `react`가 `html`을 인식하고 브라우저에 그려주게 된다.

---
### 2️⃣ App Component에 class 추가하기

```javascript
import React from "react";

function App() {
    return (
        <div className="container">
            <div className="app">
                <div className="question-section">
                    <h1 className="question-header">
                        <span>1</span>/4
                    </h1>
                    <div className="question-text">
                        일론 머스크의 우주 탐사 기업 이름은?
                    </div>
                </div>
                <div className="answer-section">
                    <button>스페이스 엑스</button>
                    <button>테슬라</button>
                    <button>보링 컴퍼니</button>
                    <button>솔라시티</button>
                </div>
            </div>
        </div>
    );
}

export default App;
```

---
### 3️⃣ 정답 오답 기능 추가하기
이벤트 핸들링 함수를 통해 `event`를 받을 수 있다.
첫번째 인자로 `event` 객체를 전달해주고 이를 통해 어떤 값을 받았는지 알 수 있다.
`event` 객체 내의 `target`에 접근하여 실제 값을 가져 올 수 있다.
```javascript
const handleClick = (e) => {
    console.log(e.target)
}
```