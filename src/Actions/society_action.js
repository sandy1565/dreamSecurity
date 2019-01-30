import axios from 'axios';
import { URN, GET_COUNTRY, GET_STATE, GET_CITY, GET_LOCATION } from '../constants/index';
import { authHeader } from '../helper/auth-header';



export const getCountry = () => {
    console.log('========countryAction========')

    const request = axios.get(`${URN}/country`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => console.log('==error==', error))

    return {

        type: GET_COUNTRY,
        payload: request
    }
}


export const getState = countryId => {
    console.log('========stateAction========')

    const request = axios.get(`${URN}/getState/${countryId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => console.log('==error==', error))

    return {
        type: GET_STATE,
        payload: request
    }
}

export const getCity = stateId => {

    console.log('========cityAction========')
    const request = axios.get(`${URN}/city/${stateId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => console.log('==error==', error))

    return {
        type: GET_CITY,
        payload: request
    }
}

export const getLocation = cityId => {

    console.log('========locationAction========')
    const request = axios.get(`${URN}/location/${cityId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => console.log('==error==', error))

    return {
        type: GET_LOCATION,
        payload: request
    }
}