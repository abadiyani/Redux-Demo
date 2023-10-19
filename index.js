const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators

//type
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

//action creator
const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}
const restockCake = (qty = 1) => {
    return {
        type: CAKE_RESTOCKED,
        quantity: qty
    }
}

//state
const initialState = {
    numberOfCakes: 10
}

//reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            };
        case CAKE_RESTOCKED: 
            return {
                ...state,
                numberOfCakes: state.numberOfCakes + action.quantity
            }
        default:
            return state;
    }
}

//create store
const store = createStore(reducer);

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
const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

//unsubscribe
unsubscribe();

