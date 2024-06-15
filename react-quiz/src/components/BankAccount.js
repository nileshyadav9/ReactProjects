import { useEffect, useReducer } from "react";
const initialState = {
  balance: 0,
  isAccountOpen: true,
  isOnLoan: false,
  isClosable: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "open":
      console.log(state.balance);
      return {
        ...state,
        balance: state.balance + action.payload,
        isAccountOpen: false,
      };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      const witAmnt = state.balance - action.payload;
      if (witAmnt < 0) {
        alert("Cannot make balance negative!");
        return { ...state };
      }
      return {
        ...state,
        balance: witAmnt,
        isClosable: state.balance === 0,
      };
    case "getLoan":
      return {
        ...state,
        balance: state.balance + action.payload,
        isOnLoan: true,
      };
    case "payLoan":
      return {
        ...state,
        balance: state.balance - action.payload,
        isClosable: state.balance === 0,
      };
    case "close":
      if (state.balance === 0) {
        alert("Account closed!");
        return { ...initialState };
      } else {
        alert("Account has balance, cannot be closed!");
        return { ...state };
      }
    default:
      break;
  }
}
function BankAccount() {
  const [{ balance, isAccountOpen, isOnLoan }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="app">
      <div className="btn btn-option">Balance: {balance}</div>
      <div className="btn btn-option">Loan:</div>
      <div>
        <button
          className="btn btn-option correct"
          onClick={() => dispatch({ type: "open", payload: 150 })}
          disabled={!isAccountOpen}
        >
          Open Account
        </button>
      </div>
      <div>
        <button
          className="btn btn-option correct"
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={isAccountOpen}
        >
          Deposit 150
        </button>
      </div>
      <div>
        <button
          className="btn  btn-option wrong"
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={isAccountOpen}
        >
          Withdraw 50
        </button>
      </div>
      <div>
        <button
          className="btn  btn-option wrong"
          onClick={() => dispatch({ type: "getLoan", payload: 5000 })}
          disabled={isAccountOpen || isOnLoan}
        >
          Loan 5000
        </button>
      </div>
      <div>
        <button
          className="btn  btn-option correct"
          onClick={() => dispatch({ type: "payLoan", payload: 5000 })}
          disabled={isAccountOpen}
        >
          Pay Loan
        </button>
      </div>
      <div>
        <button
          className="btn  btn-option correct"
          onClick={() => dispatch({ type: "close" })}
          disabled={isAccountOpen}
        >
          Close Account
        </button>
      </div>
    </div>
  );
}

export default BankAccount;
