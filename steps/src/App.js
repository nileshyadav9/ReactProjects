import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
      <CounterInSingleBlock />
      {/* same functionality as Counter in Single block but by passing props between nested components and useState */}
      <StepCounter />
      <SliderCounter />
    </div>
  );
}

function CounterInSingleBlock() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const date = new Date();
  date.setDate(date.getDate() + count);
  return (
    <div>
      <div>
        <div>
          <button className="btn" onClick={() => setStep((c) => c - 1)}>
            -
          </button>
          <span>Step: {step}</span>
          <button className="btn" onClick={() => setStep((c) => c + 1)}>
            +
          </button>
        </div>
        <button className="btn" onClick={() => setCount((c) => c - step)}>
          -
        </button>
        <span>Counter: {count}</span>
        <button className="btn" onClick={() => setCount((c) => c + step)}>
          +
        </button>
      </div>
      <div>
        <p>
          <span>
            {count === 0
              ? "Today is "
              : count > 0
              ? `${count} days from today is`
              : `${Math.abs(count)} days ago was`}
          </span>
          <span></span>
          {date.toDateString()}
        </p>
      </div>
    </div>
  );
}

function StepCounter() {
  const [stepCnt, setstepCnt] = useState(1);

  function incrementStepCnt() {
    setstepCnt((st) => st + 1);
  }
  function decrementStepCnt() {
    setstepCnt((st) => (st > 0 ? st - 1 : 0));
  }
  return (
    <div className="container">
      <button className="btn" onClick={decrementStepCnt}>
        -
      </button>
      Steps {stepCnt}
      <button className="btn" onClick={incrementStepCnt}>
        +
      </button>
      <DayCounter stepCnt={stepCnt} />
    </div>
  );
}
function DayCounter(props) {
  const stepCounter = props.stepCnt;
  console.log(props.stepCnt);
  const [dayCount, setdayCount] = useState(1);

  let newDate = new Date();
  newDate.setDate(newDate.getDate() + dayCount);

  return (
    <>
      <div className="container">
        <button
          className="btn"
          onClick={() => setdayCount((day) => day - stepCounter)}
        >
          -
        </button>
        Count {dayCount}
        <button
          className="btn"
          onClick={() => setdayCount((day) => day + stepCounter)}
        >
          +
        </button>
      </div>
      <div>
        <p>
          <span>
            {dayCount === 0
              ? "Today is "
              : dayCount > 0
              ? `${dayCount} days from today is `
              : `${Math.abs(dayCount)} days ago was `}
          </span>
          <span></span>
          {newDate.toDateString()}
        </p>
      </div>
    </>
  );
}

function Steps() {
  //let step = 1;

  // creating a state and destructuring the object int state variable and the function to set the variable

  const [step, setStep] = useState(1);
  const [isOpen, setisOpen] = useState(true);
  //const [ishide, setishide] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((curStep) => curStep - 1);
  }
  function handleNext() {
    if (step < 3) setStep((curStep) => curStep + 1);
  }

  return (
    <div>
      <button
        className="close"
        onClick={() => setisOpen((isOpenParam) => !isOpenParam)}
      >
        {isOpen ? "hide" : "show"}
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SliderCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);
  const date = new Date();
  date.setDate(date.getDate() + count);
  return (
    <div>
      <div>
        <div>
          <input
            type="range"
            min={0}
            max={10}
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
          {step}
        </div>
        <button className="btn" onClick={() => setCount((c) => c - step)}>
          -
        </button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button className="btn" onClick={() => setCount((c) => c + step)}>
          +
        </button>
      </div>
      <div>
        <p>
          <span>
            {count === 0
              ? "Today is "
              : count > 0
              ? `${count} days from today is `
              : `${Math.abs(count)} days ago was`}
          </span>
          <span></span>
          {date.toDateString()}
        </p>
      </div>
      {count !== 0 || step !== 0 ? (
        <div>
          <button
            className="btn"
            onClick={() => {
              setCount(0);
              setStep(0);
            }}
          >
            Reset
          </button>
        </div>
      ) : null}
    </div>
  );
}
