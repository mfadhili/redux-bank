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

/*ACTION CREATORS*/

function deposit(amount) {
    return {type: "account/deposit", payload: amount}
}

function withdraw(amount) {
    return {type: "account/withdraw", payload: amount}
}

function requestLoan(amount, purpose) {
    return {
        type: 'account/requestLoan',
        payload: { amount,purpose }
    }
}

function payLoan() {
    return {type:"account/payLoan"}
}

store.dispatch(deposit(5000));
store.dispatch(withdraw(200));

console.log(store.getState());

