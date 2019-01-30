const abc=require('./config.js');
// const def=require('./config.js');
const express =require('express');

const app =express();

    function decrement(){

    console.log('shubang');
   }

    setInterval(decrement, abc.time1)
    
    function increment(){
    
       console.log('shubang5');
       
   
    }
    setInterval(increment, abc.time2);

    // function subtract(){
    
    //     console.log('shubang9');
        
    
    //  }
    //  setInterval(subtract, abc.time3);

    



app.listen(3000)