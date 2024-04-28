/*
* STRUCTURE OF SLICE
* 1. INITIAL STATE
* 2. REDUCER FUNCTION
* 3. ACTION CREATORS
* */
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

const FRANKFURTER = 'api.frankfurter.app'
const ACCOUNT_DEPOSIT = "account/deposit";

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action)  {
            state.balance += action.payload;
            state.loading = false
        },
        withdraw(state, action)  {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose)  {
                return {
                    payload: {
                        amount: amount,
                        purpose: purpose
                    }
                }
            },
            reducer(state, action)  {
                if (state.loan > 0) {
                    return;
                }
                state.loan = action.payload.amount;
                state.loanPurpose =  action.payload.purpose;
                state.balance = state.balance + action.payload.amount;
            }
        },
        payLoan(state)  {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = ''
        },
        convertingCurrency(state) {
            state.loading = true;

        }
    }
});

export function deposit(amount, currency) {
    if (currency === 'USD') {
        return {
            type: ACCOUNT_DEPOSIT,
            payload: amount
        }
    }
    /*ASYNC ACTION TO BE PROCESSED FIRST*/
    return async function (dispatch, getState) {
        // API CALL
        dispatch({
            type: "account/convertingCurrency"
        })
        const resp = await fetch(`https://${FRANKFURTER}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await resp.json();
        console.log(data);
        const converted = data.rates.USD;
        // RETURN ACTION
        dispatch(
            {
                type: ACCOUNT_DEPOSIT,
                payload: converted,
            }
        )
        // return {
        //     type: ACCOUNT_DEPOSIT,
        //     payload: converted,
        // }

    }
}

console.log(accountSlice);

export const {withdraw, requestLoan,payLoan} = accountSlice.actions

export default accountSlice.reducer;

/*const ACCOUNT_DEPOSIT = "account/deposit";

/!*
REDUCER
* DOMAIN/ACTION
* *!/

export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case ACCOUNT_DEPOSIT:
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false,
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
        case "account/convertingCurrency":
            return {
                ...state,
                isLoading: true,
            }
        default:
            return state;
    }
}*/

/*
* FRANKFURTER API USAGE
*  const host = 'api.frankfurter.app';
fetch(`https://${host}/latest?amount=10&from=GBP&to=USD`)
  .then(resp => resp.json())
  .then((data) => {
    alert(`10 GBP = ${data.rates.USD} USD`);
  });
  *
  *
  * EXAMPLE PAYLOAD
  *
  * {
    "amount": 23,accountSlice
    "base": "EUR",
    "date": "2024-04-18",
    "rates": {
        "USD": 24.562
        }
    }
  * */


/* ACTION CREATOR*/

/*const FRANKFURTER = 'api.frankfurter.app'

export function deposit(amount, currency) {
    if (currency === 'USD') {
        return {
            type: ACCOUNT_DEPOSIT,
            payload: amount
        }
    }
    /!*ASYNC ACTION TO BE PROCESSED FIRST*!/
    return async function (dispatch, getState) {
        // API CALL
        dispatch({
            type: "account/convertingCurrency"
        })
        const resp = await fetch(`https://${FRANKFURTER}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await resp.json();
        console.log(data);
        const converted = data.rates.USD;
        // RETURN ACTION
        dispatch(
            {
                type: ACCOUNT_DEPOSIT,
                payload: converted,
            }
        )
        // return {
        //     type: ACCOUNT_DEPOSIT,
        //     payload: converted,
        // }

    }
}*/

/*
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
}*/
