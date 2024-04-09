import { useRef } from "react";
import { useState } from "react";
import "./App.css";
import Editor from "./components/Editor";
import Header from "./components/Header";
import List from "./components/List";

// 데이터 모델링
const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "자기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "학교가기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);
  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetID) => {
    // todos State의 값들 중에
    // targetID와 일치하는 id를 갖는 투두 아이템의 isDone 변경
    // 인수 : todos 배열에서 targetID와 일치하는 id를 갖는 요소의 데이터만 바꾼 새로운 배열
    setTodos(
      todos.map((todo) => {
        if (todo.id === targetID) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      })
    );
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} />
    </div>
  );
}

export default App;
