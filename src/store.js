import {createStore} from "redux";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};
/*
* DOMAIN/ACTION
* */

function reducer(state = initialState, action) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload,
            };
        case "account/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload,
            }
        // case "account/balance":

        case "account/payLoan":
            return {
                ...state,
                balance: state.balance - state.loan,
                loan: 0,
                loanPurpose: ''
            }
        case "account/requestLoan":
            if (state.loan > 0) {
                return state
            }
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            }
        default:
            return state;

    }
}

const store =createStore(reducer);

store.dispatch({type: "account/deposit", payload: 500});

console.log(store.getState());

store.dispatch({type: "account/withdraw", payload: 300});
console.log(store.getState());
store.dispatch({
    type: 'account/requestLoan',
    payload: {
        amount: 100,
        purpose: "Buy a car"
    }
});
console.log(store.getState());
store.dispatch({type:"account/payLoan"})
