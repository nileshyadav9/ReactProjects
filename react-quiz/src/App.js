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
import Main from "./Main";
import { useEffect } from "react";
export default function App() {
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      {/* <DateCounter /> */}
      <Header />
      <Main />
    </div>
  );
}
