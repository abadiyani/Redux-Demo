//import redux
const redux = require("redux");
const produce = require("immer").produce;

//initialState
const initialState = {
    name: "Aakash",
    address: {
        street: "123 College Dr",
        city: "California",
        zip: "08817"
    }
}

//action type
const STREET_UPDATED = "STREET_UPDATED";

//action creator
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

//reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case "STREET_UPDATED": 
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = action.payload;
            });
        default: 
            return state;
    }
}

//store
const store = redux.createStore(reducer);

//getState
console.log("Initial State: ", store.getState());

//subscribe
const unsubscribe = store.subscribe(() => {
    console.log("Updated State: ", store.getState());
});

//dispatch
store.dispatch(updateStreet("456 Main St"));

//unsubscribe
unsubscribe();