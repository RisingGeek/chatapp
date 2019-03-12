const initialState = {
    loggedIn: false,
    token: null,
    username: null,
    photo: null,
    //connectedUsers: []
}

const rootReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state, 
                loggedIn: true,
                token: action.payload.token,
                username: action.payload.username,
                photo: action.payload.photo
            };
        case 'LOGOUT':
            return {
                ...state, 
                loggedIn: false,
                token: null,
                username: null,
                photo: null
            };
            // case 'CONNECTED':
            // return {
            //     ...state,
            //     ...state.connectedUsers,
            //     connectedUsers: action.payload
            // }
        default:
            return state;
    }
}

export default rootReducer;