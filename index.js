//Cakes and IceCreams
const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

//type
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//action creator
const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}
const restockCake = (qty = 1) => {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}
const orderIceCream = () => {
    return {
        type: ICECREAM_ORDERED,
        payload: 1
    }
}
const restockIceCream = (qty = 1) => {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

//state
const cakeInitialState = {
    numberOfCakes: 10
}
const iceCreamInitialState = {
    numberOfIceCreams: 20
}

//reducer
const cakeReducer = (state = cakeInitialState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            };
        case CAKE_RESTOCKED: 
            return {
                ...state,
                numberOfCakes: state.numberOfCakes + action.payload
            }
        default:
            return state;
    }
}

const iceCreamReducer = (state = iceCreamInitialState, action) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams - 1
            };
        case ICECREAM_RESTOCKED: 
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams + action.payload
            }
        default:
            return state;
    }
}

//combine reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
});

//create store
const store = createStore(rootReducer);

//initial state
console.log("Initial State: ", store.getState());

//subscriber
const unsubscribe = store.subscribe(() => {
    console.log("Updated State: ", store.getState());
});

//dispatching actions
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

//bind Action Creators (was used back in the day)
const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

//unsubscribe
unsubscribe();

