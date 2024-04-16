import { useContext } from "react";
import { useMemo } from "react";
import { useState } from "react";
import "./List.css";
import TodoItem from "./TodoItem";
import { TodoStateContext } from "../App";

export default function List() {
  // onCreate값을 구조분해 할당으로 받기
  const todos = useContext(TodoStateContext);

  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    // filter 메소드 내부에서 todo.content.includes(search)의 결과를 반환합니다.
    return todos.filter((todo) => {
      return todo.content.includes(search); // 명시적으로 true 또는 false를 반환합니다.
    });
  };
  const fillteredTodos = getFilteredData();

  // 상태를 분석해서 수치로 제공하는 함수 (useMemo 전 로직)
  //   const getAnalyzedData = () => {
  //     console.log("getAnalyzedData 호출");
  //     // 현재 투두의 갯수
  //     const totalCount = todos.length;
  //     // 완료된 투두의 갯수
  //     const doneCount = todos.filter((todo) => todo.isDone).length;
  //     // 완료되지 않은 투두의 갯수
  //     const notDoneCount = totalCount - doneCount;

  //     return { totalCount, doneCount, notDoneCount };
  //   };

  // 1인수 콜백 함수, 2인수 의존성 배열 | 의존성 배열의 값이 변경되었을 때 함수 실행
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log("getAnalyzedData 호출");
    // 현재 투두의 갯수
    const totalCount = todos.length;
    // 완료된 투두의 갯수
    const doneCount = todos.filter((todo) => todo.isDone).length;
    // 완료되지 않은 투두의 갯수
    const notDoneCount = totalCount - doneCount;

    return { totalCount, doneCount, notDoneCount };
  }, [todos]);

  //   const { totalCount, doneCount, notDoneCount } = getAnalyzedData();

  return (
    <div className="List">
      <h4>Todo List 🔥</h4>
      <div>
        <div>total : {totalCount}</div>
        <div>done : {doneCount}</div>
        <div>notDone : {notDoneCount}</div>
      </div>
      <input
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={onChangeSearch}
      />
      <div className="todos_wrapper">
        {fillteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              //   onUpdate={onUpdate}
              //   onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}
