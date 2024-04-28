import {applyMiddleware, combineReducers, createStore} from "redux";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/account/accountSlice";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {configureStore} from "@reduxjs/toolkit";


// const rootReducer = combineReducers({
//     account: accountReducer,
//     customer: customerReducer,
// })
// const store =createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );


const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    }
});

export default store;
/*ACTION CREATORS*/



// store.dispatch(deposit(5000));
// store.dispatch(withdraw(200));
// console.log(store.getState());
//
// store.dispatch(requestLoan(2000, "Buy car"));
// console.log(store.getState());
//
// store.dispatch(payLoan());
// console.log(store.getState());
//
//
// /*CUSTOMER DISPATCH*/
// store.dispatch(createCustomer('fullName fullName', '222222222'));
// console.log(store.getState());
//
// store.dispatch(updateName("Namefull"));
// console.log(store.getState());