/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */
//import DateCounter from "./DateCounter";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Question from "../Question";
import Main from "./Main";

import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  status: "loading", //loading, error, ready, active, finished
  currentQuestionId: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  //console.log(action.payLoad);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payLoad, status: "ready" };
    case "dataError":
      return { ...state, status: "error" };
    case "startQuiz":
      return { ...state, status: "active" };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payLoad,
        points:
          action.payLoad === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    default:
      throw new Error("Unknown Action!");
  }
}

export default function App() {
  const [{ questions, status, currentQuestionId, answer, points }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payLoad: data }))
      .catch((err) => dispatch({ type: "dataError" }));
  }, []);
  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[currentQuestionId]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
