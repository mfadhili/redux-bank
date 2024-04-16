import {combineReducers, createStore} from "redux";
import {createCustomer, customerReducer, updateName} from "./features/customers/customerSlice";
import {accountReducer, deposit, payLoan, requestLoan, withdraw} from "./features/account/accountSlice";


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})
const store =createStore(rootReducer);

/*ACTION CREATORS*/



store.dispatch(deposit(5000));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(2000, "Buy car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());


/*CUSTOMER DISPATCH*/
store.dispatch(createCustomer('fullName fullName', '222222222'));
console.log(store.getState());

store.dispatch(updateName("Namefull"));
console.log(store.getState());