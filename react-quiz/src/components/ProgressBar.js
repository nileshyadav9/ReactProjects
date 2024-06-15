function ProgressBar({
  currentQuestionId,
  answer,
  numQuestions,
  points,
  maxPoints,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={currentQuestionId + Number(answer !== null)}
      />
      <p>
        Question <strong>{currentQuestionId + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/ {maxPoints}
      </p>
    </header>
  );
}

export default ProgressBar;
