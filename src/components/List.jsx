import { useState } from "react";
import "./List.css";
import TodoItem from "./TodoItem";

export default function List({ todos, onUpdate }) {
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

  return (
    <div className="List">
      <h4>Todo List 🔥</h4>
      <input
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={onChangeSearch}
      />
      <div className="todos_wrapper">
        {fillteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} />;
        })}
      </div>
    </div>
  );
}
