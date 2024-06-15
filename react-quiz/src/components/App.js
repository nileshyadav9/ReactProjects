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
import NextButton from "./NextButton";
import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import ProgressBar from "./ProgressBar";
import Result from "./Result";
import Footer from "./Footer";
import QuizTimer from "./Timer";

const SECS_PER_QUESTION = 20;
const initialState = {
  questions: [],
  status: "loading", //loading, error, ready, active, finished
  currentQuestionId: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timerLeft: null,
};

function reducer(state, action) {
  //console.log(action.payLoad);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payLoad, status: "ready" };
    case "dataError":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        timerLeft: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.currentQuestionId);

      return {
        ...state,
        answer: action.payLoad,
        points:
          action.payLoad === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQuestionId: state.currentQuestionId + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reStartQuiz":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        timerLeft: state.timerLeft - 1,
        status: state.timerLeft === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown Action!");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      currentQuestionId,
      answer,
      points,
      highscore,
      timerLeft,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

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
          <>
            <ProgressBar
              currentQuestionId={currentQuestionId}
              answer={answer}
              numQuestions={questions.length}
              points={points}
              maxPoints={questions.reduce((prev, cur) => prev + cur.points, 0)}
            />
            <Question
              question={questions[currentQuestionId]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <QuizTimer dispatch={dispatch} timeLeft={timerLeft} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                currentQuestionId={currentQuestionId}
                numQuestions={questions.length}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Result
            points={points}
            maxPoints={questions.reduce((prev, cur) => prev + cur.points, 0)}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
