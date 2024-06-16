import { useEffect, useReducer } from "react";
const initialState = {
  balance: 0,
  loan: 0,
  isAccountOpen: false,
  isClosable: false,
};
function reducer(state, action) {
  if (!state.isAccountOpen && action.type !== "open") return { ...state };
  switch (action.type) {
    case "open":
      console.log(state.balance);
      return {
        ...state,
        balance: state.balance + action.payload,
        isAccountOpen: true,
      };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      const witAmnt = state.balance - action.payload;
      if (witAmnt < 0) {
        alert("Cannot make balance negative!");
        return { state };
      }
      return {
        ...state,
        balance: witAmnt,
        isClosable: state.balance === 0,
      };
    case "getLoan":
      if (state.loan > 0) return { state };
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: state.loan + action.payload,
      };
    case "payLoan":
      if (state.loan <= 0) {
        alert("No Active Loan!");
        return { state };
      }
      return {
        ...state,
        balance: state.balance - state.loan,
        isClosable: state.balance === 0,
        loan: state.loan - action.payload,
      };
    case "close":
      if (state.balance === 0 && state.loan === 0) {
        alert("Account closed!");
        return { ...initialState };
      } else {
        alert("Account has balance or loan, cannot be closed!");
        return { ...state };
      }
    default:
      throw new Error("Unknown Action type!");
  }
}
function BankAccount() {
  const [{ balance, loan, isAccountOpen }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="app">
      <div className="btn btn-option">Balance: {balance}</div>
      <div className="btn btn-option">Loan: {loan}</div>
      <div>
        <button
          className="btn btn-option correct"
          onClick={() => dispatch({ type: "open", payload: 150 })}
          disabled={isAccountOpen}
        >
          Open Account
        </button>
      </div>
      <div>
        <button
          className="btn btn-option correct"
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isAccountOpen}
        >
          Deposit 150
        </button>
      </div>
      <div>
        <button
          className="btn  btn-option wrong"
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isAccountOpen}
        >
          Withdraw 50
        </button>
      </div>
      <div>
        <button
          className="btn  btn-option wrong"
          onClick={() => dispatch({ type: "getLoan", payload: 5000 })}
          disabled={!isAccountOpen || loan > 0}
        >
          Loan 5000
        </button>
      </div>
      <div>
        <button
          className="btn  btn-option correct"
          onClick={() => dispatch({ type: "payLoan", payload: 5000 })}
          disabled={!isAccountOpen}
        >
          Pay Loan
        </button>
      </div>
      <div>
        <button
          className="btn  btn-option correct"
          onClick={() => dispatch({ type: "close" })}
          disabled={!isAccountOpen}
        >
          Close Account
        </button>
      </div>
    </div>
  );
}

export default BankAccount;
