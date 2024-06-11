import { useState, useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return { ...state, count: action.value };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "step":
      return { ...state, step: action.value };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown Action!");
  }

  /* if (action.type === "set") {
    return { count: action.value, step: state.step };
  }
  if (action.type === "inc") {
    return { count: state.count + action.value * state.step, step: state.step };
  }
  if (action.type === "inc") {
    return { count: state.count + action.value * state.step, step: state.step };
  }
  if (action.type === "step") {
    return { count: (state.step = action.value), step: state.step };
  } */
}

function DateCounter() {
  //const [count, setCount] = useState(0);
  //const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { step, count } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const defineCount = function (e) {
    //setCount(Number(e.target.value));
    // we need the value property here since reducer is going to work based on it
    dispatch({ type: "set", value: Number(e.target.value) });
  };

  const inc = function () {
    dispatch({ type: "inc" });
    //value is optional since the operation can be done without value for this action
    //dispatch({ type: "inc", value: 1 });
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
  };

  const dec = function () {
    dispatch({ type: "dec" });
    //value is optional since the operation can be done without value for this action
    //dispatch({ type: "dec", value: -1 });
    // setCount((count) => count - 1);
    //setCount((count) => count - step);
  };

  const defineStep = function (e) {
    //setStep(Number(e.target.value));
    dispatch({ type: "step", value: Number(e.target.value) });
  };

  const reset = function () {
    //setCount(0);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
