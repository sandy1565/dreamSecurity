import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTower,getFlat,getRoles,addPerson} from '../../actionCreators/personDetailsMasterAction';
import './personDetails.css';


 class PersonDetails extends Component{
constructor(props){
    super(props)
this.state={
    userName:'',
    email:'',
  
    towerId:'',

    flatDetailId:'',    
  roles:'',

   
    familyMember:'',
    parking:'',
    
}              
                                        

}
componentDidMount(){

    console.log(   this.props.getRoles(),"mnsssss")
    this.props.getTower()
    this.props.getFlat()
    this.props.getRoles()
    
}


onChange=(e)=>{
this.setState({[e.target.name]:e.target.value});
}

Flat({flat1}){
    console.log('xyz',flat1)
if(flat1){
    return(
        flat1.map((item)=>{
            return(
                <option key={item.flatId} value ={item.flatId}>{item.flatType}</option>
            )
        })
    )
}

}

submit=(e)=>{
e.preventDefault();

this.props.addPerson({...this.state})
console.log(this.state,'adsdfskjfss');              
}

// submit=(e)=>{
//     e.preventDefault();
//     console.log(this.state.eventOrganiser);
//     this.props.AddEvent({...this.state})
//     this.setState({
//       state:{
//         eventType: [],  
//     eventName:[],
//     eventOrganiser:[],
//     startDate:[],
//     endDate:[],

//       }
//     }
getRole({roles}){
    console.log(roles,'sdfasfsdf')
    if(roles){
        return(
            roles.map((item)=>{
                return(
                <option key={item.id} value={item.roleName}>{item.roleName} </option>
                )
            })
        )
    }

}


Tower({get}){
    console.log('abcd',get)
    if(get){
        return(
  get.map((item)=>{
      return(

      <option key={item.towerId} value={item.towerId}> {item.towerName} </option>
  )
  })
  )
  }
}

render(){
    return(
        <div className="person" >
            <form  onSubmit ={this.submit}>
        <div   className="form-group">
<label>
Username

</label>
<input type="text" name="userName" onChange={this.onChange}  className="form-control" />
        </div>
   <div   className="form-group">
<label>
Email
</label>
<input type="text"  name="email"  onChange={this.onChange}   className="form-control"/>
        </div> 
        <div className="form-group">
            <label> Roles</label>
<select  name="roles"  onChange={(e)=>{this.setState({roles:e.target.value })}}    className="form-control">

{this.getRole(this.props.personDetails)}

</select>
        </div  >  
<div   className="form-group">
    <label>Tower</label>
    <select  name="towerId" value="this.state.towerId"       className="form-control" onChange ={(e)=>{this.setState({towerId:e.target.value})}}>
    {this.Tower(this.props.personDetails)}
    </select>
</div>
        <div  className="form-group">
            <label> Flat Number</label>
            <select name="flatDetailId"  value ="this.state.flatDetailId" onChange={(e)=>{this.setState({flatDetailId:e.target.value})}}     className="form-control" >
            {this.Flat(this.props.personDetails)}
            </select>
            </div>
<div   className="form-group">
    <label>floor</label>
    <input type="text" name="floor" className="form-control" onChange={this.onChange}   />
    </div>      
    <div   className="form-group">
        <label> Number of members in family</label>
        <input type="text"  name ="familyMember"  className="form-control"  onChange={this.onChange}  />
       
        </div>
        <div   className="form-group">
            <label> parking</label>
            <input  type="text"   name ="parking" className="form-control"  onChange={this.onChange}  />
        </div>
        <button className="btn btn-primary"> Submit</button>
        </form>       
             </div> 
    )
}
}


function mapStateToProps(state){
    console.log(state)
return{
    personDetails :state.personDetails
}
}

function mapDispatchToProps(dispatch){
return bindActionCreators({getTower,getFlat,getRoles,addPerson},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PersonDetails)