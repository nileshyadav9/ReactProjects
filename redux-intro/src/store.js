import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
export default store;
/* store.dispatch(deposit(500));
store.dispatch({ type: "account/deposit", payload: 500 });
console.log(store.getState());
store.dispatch(requestLoan(500, "personal"));
console.log(store.getState()); */
