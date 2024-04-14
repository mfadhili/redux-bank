import {createStore} from "redux";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};
const ACCOUNT_DEPOSIT= "account/deposit";
/*
* DOMAIN/ACTION
* */
function reducer(state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_DEPOSIT:
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
    return {type: ACCOUNT_DEPOSIT, payload: amount}
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

store.dispatch(requestLoan(2000, "Buy car"));
console.log(store.getState());

store.dispatch(payLoan())
console.log(store.getState());

