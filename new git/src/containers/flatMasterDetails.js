import React, { Component } from 'react';
import { getDetails, AddDetails } from '../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Table, Button, Modal,FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';

class flatMasterDetails extends Component {

   
      
    state = {
        editUserData: {
            flatId:'',
            societyId:'',
            societyName:[],
            societyName1:'',
             flatType:'',
            flatSuperArea:'',
            sizeId:'',
             sizeType:[],
            sizeType1:'',
            coverArea:'',
            isActive:false
        }    
        ,
        editUserModal: false,
        
    
    }


    componentWillMount(){
    //    console.log(this.state)
    //     axios.get('http://192.168.1.113:8081/api/flat/')
    //     .then(results => results.data)
    //     .then(results => this.setState({editUserData:{flatId:results,type:results,size:results}}))
        
        
        this.refreshData()
        
    }

    componentDidUpdate(){
        if(this.props.AddDetails){
            
        }
    }

    

    refreshData(){
        this.props.getDetails();
        
    }

    toggleEditUserModal() {
        this.setState({
          editUserModal: ! this.state.editUserModal
        });
      }
    
      updateBook=()=> {
         let{ flatId,flatType,flatSuperArea,coverArea} =this.state.editUserData;
    if(flatSuperArea>coverArea){
        axios.put('http://192.168.1.113:8081/api/flat/' +flatId, { flatType, flatSuperArea,coverArea})
        
       
        .then(response => console.log(response))
          this.refreshData();
    
          this.setState({
            editUserModal: false, editUserData: {  flatId: '',flatType:'', flatSuperArea: '',CoverArea:''  }
          })
        }
        else{
            console.log('flatSuperArea should be greater than coverArea')
        }
    
    }
   
      

      selectflatType =(e) =>{
         
        let{ editUserData } = this.state;

        editUserData.flatType = e.target.value;

        this.setState({editUserData})
           
            // console.log( this.state.editUserData.flatType);
          
      }
      setFlatSuperArea =(e) =>{
          
        let{ editUserData } = this.state;

        editUserData.flatSuperArea = e.target.value;

        this.setState({editUserData})
           
            // console.log(this.state.editUserData.flatSuperArea);
          
      }
      setCoverArea =(e) =>{
          
        let{ editUserData } = this.state;

        editUserData.coverArea = e.target.value;

        this.setState({editUserData})
           
            // console.log(  this.state.editUserData.coverArea);
          
      }

      editBook(flatId,flatType,flatSuperArea,coverArea) {
          this.setState({
              editUserData:{flatId,flatType,flatSuperArea,coverArea}, editUserModal: ! this.state.editUserModal
          })
        // this.setState({
        //   editUserData: { id, flatId, type, size }, editUserModal: ! this.state.editUserModal
        // });
            
        // axios.get('http://192.168.1.113:8081/api/flat/')
        // .then(results => results.data)
        // .then(results => this.setState({editUserData:{flatId:results,type:results,size:results},
        //     editUserModal: ! this.state.editUserModal}))
            
      }

        deleteUser(flatId){
            let { isActive } = this.state.editUserData
        axios.put('http://192.168.1.113:8081/api/flat/delete/'+flatId, {isActive}).then((response) => {
            this.refreshData()
            this.setState({editUserData: {isActive: false}})
            
        })
    }

    fetchUsers({list1}) {
        if(list1){
            return list1.map((item) => {
                
                return (
                    <tr key={item.flatId}>
                        <td>{item.flatType}</td>
                        <td>{item.flatSuperArea}</td>
                        <td>{item.coverArea}</td>
                        <td>
                            <Button color="success" size="sm" className="mr-2" 
                            onClick={this.editBook.bind(this, item.flatId, item.flatType, item.flatSuperArea,item.coverArea)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, item.flatId)} >Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
            <div className="container">
                
                <Link to="/flatmaster">Add flats</Link>
                <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit a flat</ModalHeader>
                    <ModalBody>
                    <FormGroup>
                        <Label for="roles">flatType</Label>
                        <input
                            type="textbox"
                            placeholder="enter  flat type"
                            value={this.state.editUserData.flatType} 
                            onChange={this.selectflatType } />
                            
                            
                    </FormGroup>
                    <FormGroup>
                        <Label for="firstName">Flat Super Area</Label>
                        <input
                            type="textbox"
                            placeholder="enter flat super area"
                            value={this.state.editUserData.flatSuperArea} 
                            onChange={this.setFlatSuperArea } />
                             
                        
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Cover Area</Label>
                        <input 
                            type="textbox"
                            placeholder="enter cover area"
                            value={this.state.editUserData.coverArea} 
                            onChange={this.setCoverArea}/>
                             
                    </FormGroup>
                
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.updateBook}>Update Flat</Button>
                    <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Table>
                    <thead>
                        <tr>
                            <th>flat Type</th>
                            <th>flat SuperArea</th>
                            <th>coverArea</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.fetchUsers(this.props.flats)}
                    </tbody>
                </Table>
            </div>
        )
    }
}

function mapStateToProps(state) {
   
    return {
        flats: state.flats
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDetails,
        AddDetails
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(flatMasterDetails)
