import { useCallback } from "react";
import { createContext } from "react";
import { useReducer } from "react";
import { useMemo } from "react";
import { useRef } from "react";
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

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.targetID ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetID);
    default:
      return state;
  }
}
// 보통 Context는 외부에 선언 / 데이터를 하위의 컴포넌트에게 공급 / export로 내보내기
export const TodoStateContext = createContext();
export const TodoDispatcheContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetID) => {
    dispatch({
      type: "UPDATE",
      targetID: targetID,
    });
  }, []);

  const onDelete = useCallback((targetID) => {
    dispatch({
      type: "DELETE",
      targetID: targetID,
    });
  }, []);

  const memoDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatcheContext.Provider value={memoDispatch}>
          <Editor />
          <List />
        </TodoDispatcheContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
