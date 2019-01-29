import { ADD_USER, GET_USERS, GET_ROLES, DELETE_USERS } from '../constants'

const initialState = {
    users: {
        id: ''
    }
}

export default function(state=[], action) {
    if(typeof state === 'undefined') {
        return initialState
    }
    switch(action.type){
        case ADD_USER:
            return {...state, users: action.payload}
        case GET_USERS:
            return {...state, user: action.payload}
        case GET_ROLES:
            return {...state, userRole: action.payload}
        
        default:
            return state;
    }

}