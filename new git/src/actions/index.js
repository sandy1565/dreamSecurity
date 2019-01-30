import axios from 'axios';

// const URL=`http://localhost:3001`;`

// export function getUser(){
//     const request = axios.get(`${URL}/userLogin`, { method: 'GET'})
//     .then(response => response.json());
//     return {
//         type:'user login',
//         payload:request
//     }
// }
const  URL_ROOT = 'http://192.168.1.113:8081/api/flat/';


export  function AddDetails(societyId,flatType,flatSuperArea,sizeId,coverArea){
  
    const request= axios.post(`${URL_ROOT}`,{societyId,flatType,flatSuperArea,sizeId,coverArea})
    .then(response => response.data)
    .then(getDetails())
    // .then(getDetails())
 
    // this.setState({flatId:response,flatType:response,flatSize:response})
    // console.log(request)
    
    return{
        type:'GET_DETAILS',
        payload:request
    }

}

export  function getDetails(){

    const request = fetch(`${URL_ROOT}`,
    {method:'GET'})
    .then(response => response.json())
   
    return{

         type:'FETCH_DETAILS',
         payload: request 
    }

}

// export  function deleteEntry(id){

//     const request = axios.delete(`${URL_ROOT}/flatsIndex/` +id)
//     .then(response => response.data)
   
//     return{

//          type:'DELETE_DETAILS',
//          payload: request 
//     }

// }