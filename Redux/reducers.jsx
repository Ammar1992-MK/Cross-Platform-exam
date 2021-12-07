import * as Actions from './actions'

const initialState = {
    sharedData: [],
}
function userReducer(state = initialState, action) {

    switch (action.type) {
        case Actions.UPDATE_DATA:
            return { ...state, sharedData: action.payload.sharedData }
        default: return state;
    }
}

export default userReducer;