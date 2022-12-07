const weatherReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_SETTINGS': return action.payload
        default: return state
    }
}

export default weatherReducer