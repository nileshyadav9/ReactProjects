function Options({ question, dispatch, answer }) {
  const isAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} 
          ${
            isAnswered
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payLoad: index })}
          disabled={isAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
