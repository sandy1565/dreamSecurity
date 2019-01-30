import React, { Component } from 'react';
// import {authHeader} from '../../helper/auth-header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCountry,getState,getCity,getLocation} from '../../Actions/society_action';
import _ from 'underscore';




// import axios from 'axios';
// import { authHeader } from '../../helper/auth-header';

class SocietyMangement extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        

        this.state = {
           countryResult:[],
           stateData:[],
           cityData:[],
           locationData:[]
           
        }
        // this.onChangeCountry=this.onChangeCountry.bind(this);
        this.cityName=this.cityName.bind(this);

        
    }

  
    componentDidMount(){
           this.props.getCountry()
           this.props.getState()
           this.props.getCity()
           this.props.getLocation()
                   
    }

    onChangeCountry= (event)=>{
      
        let selected= event.target.value
        console.log(selected)
       
        
        var country = _.find(this.props.societyReducer.countryResult,function(obj){
            return obj.countryName === selected
            })

            // var country= this.props.societyReducer.countryResult.filter((item)=> { return item.countryName===selected})
    
            console.log(country)
            
            this.props.getState(country.countryId)
        //  let request=await axios(`http://localhost:3004/state?countryId=${country.countryId}`, { method: 'GET' })
        //                     //   .then(response => {console.log(response)})

        //  console.log(request.data);

        //  this.setState({
        //      stateData: request.data
        //  })
          
    }

    
    onChangeState= (event)=>{
      
        let selected= event.target.value
        console.log(selected)
       
        
        var data1 = _.find(this.props.societyReducer.stateResult,function(obj){
            return obj.stateName === selected
            })
    
            console.log(data1)
        
            this.props.getCity(data1.stateId);
            
         
            this.props.getCity(data1.stateId);
        //  let request=await axios(`http://localhost:3004/city?stateId=${data1.stateId}`, { method: 'GET' })
        //                     //   .then(response => {console.log(response)})

        //  console.log(request.data);

        //  this.setState({
        //      cityData: request.data
        //  })
          
    }

    onChangeCity= (event)=>{
      
        let selected= event.target.value
        console.log(selected)
       
        
        var data2 = _.find(this.props.societyReducer.cityResult,function(obj){
            return obj.cityName === selected
            })
    
            console.log(data2)
            
        this.props.getLocation(data2.cityId)
        //  let request=await axios(`http://localhost:3004/location?cityid=${data2.cityId}`, { method: 'GET' })
        //                     //   .then(response => {console.log(response)})

        //  console.log(request.data);

        //  this.setState({
        //      locationData: request.data
        //  })
          
    }

  
    

    
    
    countryName({countryResult}){
        if(countryResult){
            console.log(countryResult);
           return( 
            countryResult.map((item) =>{
                   return(
                       <option key={item.countryId} value={item.countryName}>
                        {item.countryName}
                       </option>
                   )
               })
           )
            
        }
    }

    stateName({stateResult}){
        if(stateResult){
            console.log(stateResult);
           return( 
            stateResult.map((item) =>{
                   return(
                       <option key={item.stateId} value={item.stateName}>
                        {item.stateName}
                       </option>
                   )
               })
           )
            
        }
    }

    cityName=({cityResult})=>{
        console.log(cityResult);
        if(cityResult){
            
           return( 
            cityResult.map((item) =>{ console.log(item.cityName)
                   return(
                       <option key={item.cityId} value={item.cityName}>
                        {item.cityName}
                       </option>
                   )
               }
               )
           )
            
        }
    }

    locationName({locationResult}){
        if(locationResult){
            console.log(locationResult);
           return( 
            locationResult.map((item) =>{
                   return(
                       <option key={item.locationId} value={item.locationName}>
                        {item.locationName}
                       </option>
                   )
               })
           )
            
        }
    }



    handleSubmit=(e)=>{
       console.log("======submitted",e.target.value)
       e.preventDefault();
    }



    render() {
         console.log(this.props.societyReducer)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label><h4>Country Name</h4></label>
                        <select onChange={this.onChangeCountry}>
                            <option>Select</option>
                            {this.countryName(this.props.societyReducer)}
                             {/* {this.props.societyReducer.country.map((m, k) =>
                               <option key={k.countryId}>{m.countryName}</option>
                            )}  */}
                            
                          

                        </select>
                    </div>
                    <div className="form-group">
                        <label><h4>State Name</h4></label>
                        <select onChange={this.onChangeState}>
                            <option>Select</option>
                            {this.stateName(this.props.societyReducer)}
                           
                            {/* {this.state.stateData.map((m, k) =>
                                <option key={k}>{m.stateName}</option>
                            )} */}
                            {/* <option>{filteredOptions.stateName}</option> */}
                            
                            
                        </select>
                    </div>
                    <div className="form-group">
                        <label><h4>City Name</h4></label>
                        <select onChange={this.onChangeCity}>
                            <option>Select</option>
                            {this.cityName(this.props.societyReducer)}
                            
                             {/* {this.state.cityData.map((m, k) =>
                                <option key={k}>{m.cityName}</option>
                            )}  */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label><h4>Location Name</h4></label>
                        <select>
                            <option>Select</option>
                            {this.locationName(this.props.societyReducer)}
                            {/* {this.state.locationData.map((m, k) =>
                                <option key={k}>{m.locationName}</option>
                            )} */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor='society'><h4>Society Name</h4></label>
                        <input name="society" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('===========stateCountry=========', state)
   
    return {
        societyReducer: state.societyReducer    
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry,getState,getCity,getLocation }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(SocietyMangement));



