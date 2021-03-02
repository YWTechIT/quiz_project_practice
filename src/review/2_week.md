## 📍 퀴즈 앱 배포하기(2주차) 복습
구현하는 기능

### 1️⃣ 퀴즈 문제 추가생성
1주차에서 했던 퀴즈는 한 문제였다. 더 많은 퀴즈를 내기 위해서는 문제를 추가적으로 만들어야하는데 다음과 같다.

```javascript
// 1주차 퀴즈(한 문제)
const Quiz = [
    {
    id: 1,
    question: '이디야에서 가장 맛있는 커피는?',
    answer: 
    {text: '아이스아메리카노', isTrue: false},
    {text: '콜드브루', isTrue: false},
    {text: '아이스티에 샷추가', isTrue: true},
    {text: '카페라떼', isTrue: false},
    }
]

// 2주차 퀴즈(4문제)
const Quizzes = [
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
```
이렇게 설정하게 되고나서 값에 접근하고 싶으면
Quiz[0], Quiz[1] 처럼 사용할 수 있다. 
`python`과는 다르게 `{}`마다 객체가 구분되는것을 알 수 있다. 
또, `isTrue` 값을 선언해서 이 프로퍼티를 통해 버튼에 넘겨주고 정답인지 아닌지를 표시 할 수 있다.

---
### 2️⃣ map함수 사용
1주차에 작성했던 `button`의 코드가 중복되므로 줄여서 표시 할 소요가 생겼다.
따라서, `map`함수를 사용하자.
이때 주의할 점은 `map`함수를 사용할 때 `Quiz[표시 할 단락]`을 사용하자. (삽질 했다.)
```javascript
// 1주차 코드
<>
    <button onClick={handleClick}>스페이스 엑스</button>
    <button onClick={handleClick}>테슬라</button>
    <button onClick={handleClick}>보링 컴퍼니</button>
    <button onClick={handleClick}>솔라시티</button>
</>

// 2주차 코드(map함수 사용)
const [currentObject, setCurrentObject] = useState(0);
{
    Quiz[currentObject].answers.map((answer) => (<button>{answer.text}</button>)
}
```

---
### 3️⃣ 정답판정
정답판정은 `handleClick` 함수에 `isTrue` 인자를 넘겨주면된다.
단, 주의할점은 `<button onClick={() => {handleClick()}>`처럼 화살표를 사용하지 않고 바로 보내면 
`<button>`렌더링이후 함수를 자동으로 실행시키라는 코드가 되기때문에 <span style='color:blue'>매개변수로 값을 넘길때는 항상 함수로 감싸야하는다는것</span>을 잊지말자.

```javascript
const handleClick = (isTrue) => {
    if(isTrue === true){
        alert('정답')
    }else{
        alert('오답')
    }
}

<button onClick={() => {handleClick(answer.isTrue)}}>{answer.text}</button>
```

---
### 4️⃣ 버튼 선택 후 자동으로 문제 넘어가기
위에서 선언했던 `handleClick` 컴포넌트에 조금만 코드를 추가해주면 된다.
만약, 버튼을 클릭했다면 `useState`에 선언했던 `setCurrentObject`값을 1 증가시키면 된다.
그러면 현재의 값에 `Quiz.id`값이 물리게 되고 문제가 바뀐다.

```javascript
const handleClick = (isTrue) => {
    if(isTrue === true){
        alert('정답')
    }else{
        alert('오답')
    }
    
    setCurrentObject((currentObject) => currentObject + 1)
}
```

### 💡 `useState`의 함수형 업데이트
기존 값에서 `update`를 할때는 함수형으로 업데이트를 할 수 있다.
함수형을 사용하는 이유는 `useState`의 비동기적 특성으로 인해 비효율이 발생하는데, 함수형을 사용하면 해당 비효율(리렌더링 횟수를 줄임)을 회피 할 수 있다.

`setState`를 사용하여 상태를 업데이트 할 경우, 업데이트 된 상태는 즉시 반영되지 않는다. 이유는 `setState`는 비동기적으로 작동하기 때문에!!

따라서 리렌더링 된 후에야 비로소 업데이트된 `state`가 반영된다. (state변경 - 리렌더링 - state반영)

리액트에서 여러 `state`를 동시에 업데이트 하는경우 리액트는, `state`를 `batching`하여 업데이트를 진행한다.
 * batching: 전달된 오브젝트들을 하나로 합치는 작업(`object composition` 이라고도 불림) 

이러한 특성때문에 업데이트 된 `state`를 즉시 반영하기위해서는 `useEffect()`를 사용한다.

또, 비동기적인 방법을 해결하기 위해 `함수형 업데이트(functional update)`를 사용할 수있는데, `setState`에 값을 그대로 전달하는것이 아니고 함수를 전달하는 것이다.

함수형 업데이트는 `useCallback`과 함께 `props`로 전달된 함수를 최적화 시킬때도 유용하게 사용가능하다.
예를 들어, `handleClick` 함수가 자식 컴포넌트에게 `props`를 통해서 전달 될 경우, `useCallback`을 사용해서 함수를 감싼다.
`const handleToggle = useCallback((): void => setIsClicked(!isClicked), [isClicked]);`

하지만 이럴 때에도 `isClicked`에 대한 의존성 배열을 가지게 된다. 이때 의존성을 없애고 싶다면 함수형 업데이트를 사용하자.
`const handleToggle = useCallback((): void => setIsClicked(prev => !prev), []);`

```javascript
// JS object composition
const singleObject = Object.assign({},
    objectFromSetState1,
    objectFromSetState2,
    objectFromSetState3,
)

// react batching
const [value, setValue] = useState(0);

setValue(value + 1);
setValue(value + 1);
setValue(value + 1);
👉🏽 expected value: 3
👉🏽 real value: 1

// react functional update
const [value, setValue] = useState(0);

setValue((value) => value + 1);
setValue((value) => value + 1);
setValue((value) => value + 1);
👉🏽 expected value: 3
👉🏽 real value: 3

```

---
### 5️⃣ 결과 page보여주기
결과 page는 삼항연산자를 이용해서 표시 할 수 있다.
먼저, 언제 삼항연산자를 보여줄것인가를 생각하자. 
작동시기는 마지막 문제를 풀고 난 이후에 보여주면 된다. 그러면, 구현시기를 먼저 구현해보자.

```javascript
const [resultPage, setResultPage] = useState(false);

const handleClick = (isTrue) => {
    if(isTrue === true){
        alert('정답')
    }else{
        alert('오답')
    }
    
    if (currentObject === Quiz.length - 1){
        setResultPage(true)
    }else{
        setCurrentObject((currentObject) => currentObject + 1)
    }
}
```

그리고 `setResultPage(true)`가 되면 보여줄 페이지를 그리면 되는데 `return()` 이후로 삼항연산자를 사용하면된다.
```javascript
const App = () => {
return(
    <>
    {
        resultPage(true)
        ? <div>결과페이지입니다.</div>
        : <div>기존페이지</div>
    }
    </>
)}

```

