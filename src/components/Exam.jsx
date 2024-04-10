import { useReducer } from "react";

// 변환기 역활
function reducer(state, action) {
  console.log(state, action);
  //   if (action.type === "PLUS") {
  //     return state + action.data;
  //   }
  //   if (action.type === "MINUS") {
  //     return state - action.data;
  //   }
  switch (action.type) {
    case "PLUS":
      return state + action.data;
    case "MINUS":
      return state - action.data;
    default:
      return state;
  }
}

export default function Exam() {
  // dispatch : 발송하다, 급송하다
  // 상태변화가 있어야 한다는 사실을 알리는 함수
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    // 인수 : 상태가 어떻게 변화되길 원하는지
    // 액션 객체
    dispatch({
      type: "PLUS",
      data: 1,
    });
  };

  const onClickMinus = () => {
    dispatch({
      type: "MINUS",
      data: 1,
    });
  };

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
}
