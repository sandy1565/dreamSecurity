import React,{ Component } from 'react';
import './flatMaster.css';
import { connect } from 'react-redux';
import {AddDetails,getSocietyNameDetails,getSizeTypeDetails,getDetails} from '../../Actions/Flat_action';
import { bindActionCreators } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';


class FlatMaster extends Component{
       constructor(props){
           super(props);
           this.state= {
                societyId:'',
                
                 flatType:'',
                flatSuperArea:'',
                sizeId:'',
                 
                coverArea:'',
                 validationError:'',
                 errors:{},
                 isSubmit: false
           }
           
       }

       componentDidMount() {
           this.props.getSocietyNameDetails()
           this.props.getSizeTypeDetails()
       }
    
     submit=(e) =>{
         e.preventDefault();
         let errors={};
         if(!this.state.societyId){
             errors.societyId="society name cannot be empty"
         }
         if(this.state.flatType ==='') errors.flatType="cant be empty";
           else if(this.state.flatType.length < 3) errors.flatType="Characters should be less than four"
         if(this.state.flatSuperArea==='') errors.flatSuperArea="cant be empty";
           
         if(!this.state.sizeId){
             errors.sizeId="sizeType cannot be empty";
         }
         if(this.state.coverName==='')errors.coverArea="cant be empty";
         this.setState({errors});

         const isValid = Object.keys(errors).length === 0

         if( isValid){
            this.setState({isSubmit: true})
       this.props.AddDetails({...this.state})
        this.setState({
            societyId:"",
            flatType:'',
            flatSuperArea:'',
            sizeId:'',
            coverArea:'',
            isSubmit:true
        });
       
    //  
    }
      
       

    //    this.props.AddDetails(societyId,flatType,flatSuperArea,sizeId,coverArea)
       this.props.history.push('/superDashboard/flatmaster/flatmasterdetails');
    //    this.props.getDetails();
   
               
}
    onChange = (e) => {
        if(!!this.state.errors[e.target.value]){
            // let errors=Object.assign({},this.state.errors);
            // delete errors[e.target.name];
            // this.setState({[e.target.name]:e.target.value.trim(''),errors});
        }else{
            this.setState({[e.target.name]:e.target.value.trim('')});
        }
            
            console.log(this.state)
    }
    societyName({list0}){
        console.log(list0)
        if(list0){
            
           return( 
               list0.map((item) =>{
                   return(
                       <option key={item.societyId} value={item.societyId}>
                        {item.societyName}
                       </option>
                   )
               })
           )
            
        }
    }



    // selectedSizeType=(e)=>{
    //     this.state.sizeId=e.target.value
    //     console.log(this.state.sizeId)
    // }
    sizeType({list4}){
        if(list4){
            
           return( 
               list4.map((item) =>{
                   return(
                       <option key={item.sizeId} value={item.sizeId}>
                        {item.sizeType}
                       </option>
                   )
               })
           )
            
        }
    }
    
    push=() =>{
        this.props.history.push('/superDashboard/flatmaster/flatmasterdetails')
    }
     
    render(){
        
         
               const form = <Form onSubmit={this.submit}>
                <FormGroup>
                <Label>SocietyName</Label>
                    <Input  
                    type="select"
                    name="societyId"
                    onChange={this.onChange}>  
                    <option >--SELECT--</option>        
                {this.societyName(this.props.flat)}    
                    </Input>
                    <span>{this.state.errors.societyId}</span>
                    
                </FormGroup>


                <FormGroup>
                    <Label>Flat Type</Label>
                    <Input 
                    type="text"
                    name="flatType"
                    value={this.state.flatType} 
                    onChange={this.onChange}/>
                    <span>{this.state.errors.flatType}</span>
                </FormGroup>

                <FormGroup>
                <Label>Flat SuperArea</Label>
                <Input
                type="number"
                name="flatSuperArea"
                value={this.state.flatSuperArea} 
                onChange={this.onChange}/>
                 <span>{this.state.errors.flatSuperArea}</span>
                 </FormGroup>

                 <FormGroup>
                <Label>Size Type</Label>
                <Input
                type="select"
                name="sizeId"
                onChange={this.onChange}>
                <option>--SELECT--</option>
            {this.sizeType(this.props.flat)} 
                </Input> 
                <span>{this.state.errors.sizeId}</span>
                </FormGroup>

                <FormGroup>
                <Label>CoverArea</Label>
                <Input
                type="number"
                name="coverArea"
                value={this.state.coverArea} 
                onChange={this.onChange}/>
                </FormGroup>
            
                <FormGroup>
                    <Button color="primary" type="submit" col="sm-2">Submit</Button>
                    <Button color="success" onClick={this.push}>FlatDetails</Button>
                </FormGroup> 
                </Form>      
           
            
            return (
                <div className="flatMaster">
                    {this.state.isSubmit ? <Redirect to="/superDashboard/flatmaster/flatmasterdetails" />: form}
                </div>
            )
           
    }
}
function mapStateToProps(state) {
   
    return {
        flat: state.flat
        
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({AddDetails,getSocietyNameDetails,getSizeTypeDetails,getDetails},dispatch)

}

export  default connect(mapStateToProps,mapDispatchToProps) (FlatMaster);