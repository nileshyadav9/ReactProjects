function Result({ points, maxPoints, highscore, dispatch }) {
  const percentage = Math.round((points / maxPoints) * 100);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} ({percentage}{" "}
        %)!
      </p>
      <p className="highscore">(Highscore: {highscore} points!)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reStartQuiz" })}
      >
        Restart!
      </button>
    </>
  );
}

export default Result;
