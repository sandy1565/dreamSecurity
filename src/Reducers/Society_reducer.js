import {GET_COUNTRY, GET_STATE, GET_CITY, GET_LOCATION} from '../constants/index'
export default function(state={},action){
    console.log('=============societyReducer===========',action.payload);
    switch(action.type){
    case GET_COUNTRY:
    return {  ...state, countryResult: action.payload};

      
    case GET_STATE:
    return {  ...state, stateResult: action.payload};


    case GET_CITY:
    return {  ...state, cityResult: action.payload};

    case GET_LOCATION:
    return {  ...state, locationResult: action.payload};

    default:
        return state;
    }
}





