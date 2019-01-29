import {authHeader} from '../helper/auth-header';
import axios from 'axios';
import {URN,ADD_SIZE,GET_SIZE} from '../constants/index';
export   function AddSize(values){
 
    const request =axios.post(`${URN}/size`,values,{headers:authHeader()},{method:'POST'})
     .then()
      return{  
          type:ADD_SIZE,
          payload: request
      }

}

export function displaySize(){
    const request = fetch(`${URN}/size`,{headers:authHeader()},{method:'GET'})
    .then(response => response.json())
    return {
        type:GET_SIZE,
        payload:request
    }
}