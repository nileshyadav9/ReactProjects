import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});
export default store;
/* store.dispatch(deposit(500));
store.dispatch({ type: "account/deposit", payload: 500 });
console.log(store.getState());
store.dispatch(requestLoan(500, "personal"));
console.log(store.getState()); */
