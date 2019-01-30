
export default function(state={},action){

    switch(action.type){
        case 'ADD_DETAILS':
            return{...state,list:action.payload}
        case 'FETCH_DETAILS':
            return{...state,list1:action.payload}
        case 'DELETE_DETAILS':
            // return{...state,list2:action.payload}
        default:
            return state;
    }

}