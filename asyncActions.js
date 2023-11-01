//package
const redux = require('redux');
const axios = require('axios');

//Middleware and Thunk
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;


//state
const initialState = {
    loading: false,
    data: [],
    error: ""
}

//action types
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED"
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED"
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED"

//action creators
const fetchUsersRequest = () => {
    return{
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

//reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUESTED: 
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCEEDED: 
            return{
                loading: false,
                data: action.payload,
                error: ""
            }
        case FETCH_USERS_FAILED: 
            return {
                loading: false,
                data: [],
                error: action.payload
            }
    }
}

//async action creator
const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest());
        //async axios call
        axios.get('https://jsonplaceholder.typicode.com/users').
        then((response) => {
            const users = response.data.map((user)=> user.id);
            dispatch(fetchUsersSuccess(users));
        }).catch((error) => {
            dispatch(fetchUsersFailure(error.message));
        });

    }
}

//store
const store = redux.createStore(reducer, applyMiddleware(thunkMiddleware));
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
