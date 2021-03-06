import axios from 'axios';
import { authHeader } from '../helper/auth-header';
import _ from 'lodash';

import{URN,ADD_USER,FETCH_BASEMENT,FETCH_PARKING,CREATE_PARKING,GET_ROLES,GET_USERS,DELETE_USERS,ADD_TOWER,GET_TOWER,ADD_SIZE,GET_SIZE,UPDATE_SIZE,GET_EVENT,POST_EVENT} from '../constants/index';


export function addUser(values) {
    console.log("localstorage get item---?",localStorage.getItem('token'))
    const request = axios.post(`${URN}/auth/signup`, values , { method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': authHeader()
                    },
                    body: JSON.stringify(values) })
                    .then(response => response.data)
                    .then(result => result)
                    .catch(error=> error);
                    return {
                        type: ADD_USER,
                        payload: request
                    }
}

export function getUsers(){
    const request = axios.get(`${URN}/user`,  {headers:authHeader()}).then((response) => response.data)
    .then()

    return {
        type: GET_USERS,
        payload:request
    }
}

export function getRoles(){
    const request = axios.get(`${URN}/user/userRole`, {headers:authHeader()})
    .then((response =>response.data))

    return {
        type: GET_ROLES,
        payload:request
    }
}

export function deleteUsers(id){
   axios.delete(`${URN}/User/` +id,{headers:authHeader()})
    .then((response) => response.data)

    return {
        type:DELETE_USERS,
        payload:id
    }
}
// ===================Testing============

export const DELETE_PARKING = 'DELETE_PARKING';
const ROOT_URL = 'http://localhost:3001';
const API_KEY = '?key=parking'

export function fetchBasement(){
    const request = axios.get(`${URN}/parking`, {headers:authHeader()});
    return {
        type: FETCH_BASEMENT,
        payload: request
    };
}

export function createParking(props){
    const request = axios.post(`${URN}/slot`, props,  {headers:authHeader()});
    return {
        type: CREATE_PARKING,
        payload: request
    } 
}

export function fetchParking(props){
    const request = axios.get(`${URN}/slot`, props, {headers:authHeader()});
    return {
        type: FETCH_PARKING,
        payload: request
    }
}   

export function deleteParking(id){
    const request = axios.delete(`http://localhost:3002/createParking/${id}${API_KEY}`);
    return {
        type: DELETE_PARKING,
        payload: request
    }
}

// =====================


export  default function AddTower(values){
    const request = axios.post(`${URN}/tower`,values, {method: 'POST',headers:authHeader()})
    .then()
   console.log(request);
   
    return{
        type:  ADD_TOWER,
        payload: request
    }
}


export function viewTower(){
const request  = fetch(`${URN}/tower`,{method: 'GET',headers:authHeader()})
.then(response => response.json())
return{
      type: GET_TOWER,
      payload: request
}
}


export   function AddSize(values){
 
    const request =axios.post(`${URN}/size`,values,{method:'POST',headers:authHeader()})
     .then()
      return{  
          type:ADD_SIZE,
          payload: request
      }

}

export function displaySize(){
    const request = fetch(`${URN}/size`,{method:'GET',headers:authHeader()})
    .then(response => response.json())
    return {
        type:GET_SIZE,
        payload:request
    }
}

export function updateSize(size) {
    return dispatch => {
      return dispatch({
        type: UPDATE_SIZE,
        payload: axios.put(`${URN}/size1/${size._id}`, size)
      })
    }   
  }
//   export function deleteUsers(id){
//     const request = axios.delete('http://192.168.1.113:8081/api/size/1' +id)
//     .then((response) => response.data)

//     return {
//         type:'DELETE_SIZE',
//         payload:id
//     }
// }


//   export function editUsers(id, size_id,size_type) {
//     const request = axios.put(`{URL}/${id}`, {size_id,size_type})
// }


export function ViewEvent(){
const request = axios.get(`${URN}/event`,{headers:authHeader()}).then((response)=>{
    response.data
})
return{
    type:GET_EVENT,
    payload:request
}
}

export function GetEventOrganiser(){
    const request = axios.get(`${URN}/eventOrganiser`,{headers:authHeader()}).then((response)=>{
        response.data
    })
    return{
        type: 'GET_EVENT_ORGANISER',
        payload:request
    }
}

