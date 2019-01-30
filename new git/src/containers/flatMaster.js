import React,{ Component } from 'react';
import './flatMaster.css';
import FlatMasterDetails from './flatMasterDetails';
import { connect } from 'react-redux';
import {AddDetails,getDetails} from '../actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';

class FlatMaster extends Component{
       constructor(props){
           super(props);
           this.state= {
                societyId:'',
                societyName:[],
                societyName1:'',
                 flatType:'',
                flatSuperArea:'',
                sizeId:'',
                 sizeType:[],
                sizeType1:'',
                coverArea:'',
                 validationError:''
           }
       }

    //    componentDidMount() {
    //     console.log(this.state);
    //     axios.get('http://192.168.1.113:8081/api/flat/')
    //     .then(results => results.data)
        
    //     .then(results => this.setState({flatId:results,type:results,size:results}))
        
       
    //    }
       

    //    refreshData =() =>{
       
        
    //     this.setState(this.props.getDetails())
    // }

     submit=(e) =>{
         e.preventDefault();
        
        //  this.setState({flatId:event.target.value})
   
       const societyId=this.state.societyId;
       const flatType =this.state.flatType;
       const flatSuperArea=this.state.flatSuperArea;
       const sizeId=this.state.sizeId;
       const coverArea=this.state.coverArea;
       
       if(flatSuperArea>coverArea){
       console.log(societyId,flatType,flatSuperArea,sizeId,coverArea);

       this.props.AddDetails(societyId,flatType,flatSuperArea,sizeId,coverArea)
       this.props.history.push('/flatmaster/flatmasterdetails');
       }
       else
       {
           console.log('coverArea should be less then flatSuperArea');
       }
    //    this.props.Details(flatId,flatType,flatSize)

    //    console.log(flatId,flatType,flatSize)
               
    }
    selectedSocietyName =(e) =>{
     this.state.societyId=e.target.value
     
     console.log(this.state.societyId)
    }
    societyName=() =>{
        axios.get('http://192.168.1.113:8081/api/society')
        .then(results => results.data)
        
        .then(results => this.setState({societyName:results}))
        
    }


    selectedSizeType=(e)=>{
        this.state.sizeId=e.target.value
        console.log(this.state.sizeId)
    }

    sizeType=() =>{
        // console.log('========================shubjj===============',sizeId);
        axios.get('http://192.168.1.113:8081/api/size/')
            .then(results => results.data)
            
            .then(results => this.setState({sizeType:results}))
            
    }
    
     
    render(){
        return(
            <div className="flatMaster">
            <div>
            <form onSubmit={this.submit}>
          
            <label>SocietyName</label>
            <select  
            
            value={this.state.societyId} 
            onClick={this.societyName}
            onChange={this.selectedSocietyName}>
                    
            {this.state.societyName.map((item) =><option key={item.societyId} value={item.societyId}>{item.societyName}</option>)}
                 
            </select><br/><br/>


            <label>Flat Type</label>
            <input 
            type="textbox"
            value={this.state.flatType} 
            onChange={(e) => this.setState({flatType: e.target.value , validationError: e.target.value === "" ? 
              "You must select your favourite team" : ""})}/>
            {/* {this.state.type.map((item) => <option key={item.id} value={item.type}>{item.type}</option>)} */}
            <br/><br/>


            <label>Flat SuperArea</label>
            <input
            type="number"
            value={this.state.flatSuperArea} 
            onChange={(e) => this.setState({flatSuperArea: e.target.value , validationError: e.target.value === "" ? 
              "You must select your favourite team" : ""})}
            />
            {/* {this.state.size.map((item) => <option key={item.id} value={item.size}>{item.size}</option>)} */}
            <br/><br/>

            <label>Size Type</label>

            <select
            
            value={this.state.sizeId} 
            onClick={this.sizeType}
            onChange={this.selectedSizeType}>
            
            {this.state.sizeType.map((item) =><option key={item.sizeId} value={item.sizeId}>{item.sizeType}</option>)} 
            </select> <br/><br/>

            <label>CoverArea</label>
            <input
            type="number"
            value={this.state.coverArea} 
            onChange={(e) => this.setState({coverArea: e.target.value , validationError: e.target.value === "" ? 
              "You must select your favourite team" : ""})}/>
            {/* {this.state.size.map((item) => <option key={item.id} value={item.size}>{item.size}</option>)} */}
            <br/><br/>
           

            <input type="submit"/>
              </form>
            </div>
            
            {/* <FlatMasterDetails/> */}
            </div>
            
        )
           
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({AddDetails,getDetails},dispatch)

}

export  default connect(null,mapDispatchToProps) (FlatMaster);