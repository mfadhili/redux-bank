const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};
const ACCOUNT_DEPOSIT = "account/deposit";

/*
* DOMAIN/ACTION
* */
export default function accountReducer(state = initialStateAccount, action) {
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

export function deposit(amount) {
    return {type: ACCOUNT_DEPOSIT, payload: amount}
}

export function withdraw(amount) {
    return {type: "account/withdraw", payload: amount}
}

export function requestLoan(amount, purpose) {
    return {
        type: 'account/requestLoan',
        payload: {amount, purpose}
    };
}

export function payLoan() {
    return {type: "account/payLoan"};
}