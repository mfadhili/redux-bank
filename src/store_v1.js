import {combineReducers, createStore} from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

const initialStateCustomer = {
    fullName: '',
    nationalID: "",
    createdAt: '',
};

const ACCOUNT_DEPOSIT= "account/deposit";


/*
* DOMAIN/ACTION
* */
function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            };
        case 'customer/updateName':
            return {
                ...state,
                fullName: action.payload.fullName,
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})
const store =createStore(rootReducer);

/*ACTION CREATORS*/

function deposit(amount) {
    return {type: ACCOUNT_DEPOSIT, payload: amount}
};

function withdraw(amount) {
    return {type: "account/withdraw", payload: amount}
};

function requestLoan(amount, purpose) {
    return {
        type: 'account/requestLoan',
        payload: { amount,purpose }
    };
};

function payLoan() {
    return {type:"account/payLoan"};
};

store.dispatch(deposit(5000));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(2000, "Buy car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());


/* CUSTOMER ACTION CREATORS*/
function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer",
        payload: {fullName, nationalID, createdAt: new Date().toISOString()},
    }
}

function updateName(fullName) {
    return {
        type: "customer/updateCustomer",
        payload: {fullName},
    }
}

/*CUSTOMER DISPATCH*/
store.dispatch(createCustomer('fullName fullName', '222222222'));
console.log(store.getState());

store.dispatch(updateName("Namefull"));
console.log(store.getState());