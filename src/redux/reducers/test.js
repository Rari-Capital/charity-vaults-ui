import { CHANGE_TEST_TOGGLE } from '../actions/test.js';

const initialState = {
    testToggle: false,
}

const testReducer = (state = initialState, action) => {
    console.log("entered reducer");
    switch (action.type) {
        case CHANGE_TEST_TOGGLE:
            console.log("changing test toggle in reducer");
            return {
                ...state,
                testToggle: !state.testToggle,
            }
        default:
            return state;
        
    }
}

export default testReducer;