import "./TodoItem.css";

export default function TodoItem({ id, isDone, content, date }) {
  return (
    <div className="TodoItem">
      <input type="checkbox" checked={isDone} readOnly />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button>삭제</button>
    </div>
  );
}
