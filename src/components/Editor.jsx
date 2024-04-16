import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import "./Editor.css";
import { TodoDispatcheContext } from "../App";

export default function Editor() {
  // onCreate값을 구조분해 할당으로 받기
  const { onCreate } = useContext(TodoDispatcheContext);

  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // Enter키로 전송하기
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    // input 값 비어있으면 막기
    if (content === "") {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    // input 값 비워주기
    setContent("");
  };
  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
        placeholder="새로운 Todo..."
        required
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
}
