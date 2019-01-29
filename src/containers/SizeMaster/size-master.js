import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {AddSize} from '../../Actions/size_action';
import 'bootstrap/dist/css/bootstrap.min.css';



 class SizeMaster extends Component{
constructor(props){
super(props);
this.state ={
   
    sizeType:""
}

this.onChange = this.onChange.bind(this);
this.submit = this.submit.bind(this);
}

onChange(e){
    this.setState({[e.target.name]: e.target.value});
}


submit(e){
    e.preventDefault();
    console.log(this.state);
     this.props.AddSize(this.state)
     return this.setState({ state:{
        
        sizeType:""
     }
     }),
     this.props.history.push('/superDashboard/display-size');

}


render(){
return(
<div>
    <form onSubmit ={this.submit}>
 
        <div className="form-group">
        <label> Size Type</label>
        <input type ="text"  className ="form-control" placeholder = "sizeType" value ={this.state.size_type} name ="sizeType" onChange ={this.onChange}  />
      </div>
      <div  className ="form-group">
       <button type= "submit"  className= " form-control btn btn-primary ">Submit</button>
       </div>
    </form>
    
</div>

)   

}

}

function mapStateToProps(state){
    console.log('shub',state);
    return{
        size : state.SizeDetails
    }

}

function mapDispatchToProps(dispatch){
    return bindActionCreators({AddSize},dispatch);

}


export  default connect(mapStateToProps,mapDispatchToProps)(SizeMaster)