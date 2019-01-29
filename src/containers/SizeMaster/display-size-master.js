

import React, { Component } from 'react';
import { displaySize } from '../../Actions/size_action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {authHeader} from '../../helper/auth-header';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
// import { Link } from 'react-router-dom';
class DisplaySizeMaster extends Component {



  state = {
    editSizeData:{
      id:"",
      sizeId:[],
      sizeType: []
    },
    editSizeModal:false
  }

  componentDidMount() {

    this.props.displaySize()

  }

  refreshData() {
    this.props.displaySize();
  }

  OnKeyPresshandle(event) {
    const pattern=/^[0-9]$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
      
    }
  }

  
  toggleEditSizeModal(){
    this.setState({
      editSizeModal :!this.state.editSizeModal
    })
  }
  updateSize() {
    let { id, sizeId, sizeType } = this.state.editSizeData;
    console.log('dfdsfd', id,sizeId, sizeType);
 
    axios.put('http://192.168.1.113:8081/api/size/' +this.state.editSizeData.sizeId, {
      sizeType
    },{headers:authHeader()}).then((response) => {

      this.refreshData();

      this.setState({
        editSizeModal: false, editSizeData: { sizeType: '' }
      })
    });
  }

  
  editSize(id,sizeId,sizeType){
    console.log('ghrehj');
    this.setState({
      editSizeData: {id,sizeId,sizeType}, editSizeModal:!this.state.editSizeModal
    })
    return <div> loading</div>
  }



  deleteSize(sizeId) {
    console.log('sisxcdasd', sizeId);

    axios.delete('http://192.168.1.113:8081/api/size/' + sizeId,{headers:authHeader()}).then((response) => {
      console.log(response.data);
      this.setState(this.refreshData())
    })
      .catch((err) => {
        console.log(err);
      })
  }

  TowerMasterDetails({ getSize }) {
    console.log("getSize ", getSize);
    if (getSize) {
      return getSize.map((item) => {
        return (
          <tr key={item.sizeId}>



            <td>{item.sizeType}</td>
        
            <td>
              <button className="btn btn-primary" onClick={this.editSize.bind(this, item.id,item.sizeId, item.sizeType)}> Edit</button>
            
              <button className="btn btn-danger" onClick={this.deleteSize.bind(this, item.sizeId)}>Delete</button>
            </td>
          </tr>
        )
      })
    }
    return <div>...loading</div>
  }


  render() {


    return (

      <div>
        <h3 align="center"> Size List</h3>

        <Modal isOpen={this.state.editSizeModal} toggle={this.toggleEditSizeModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditSizeModal.bind(this)}>Edit  Size Details</ModalHeader>
          <ModalBody>


            <FormGroup>
              <Label for="lastName"> Size Type</Label>
              <Input id="sizeType" value={this.state.editSizeData.sizeType} onChange={(e) => {
                let { editSizeData } = this.state;

                editSizeData.sizeType = e.target.value;

                this.setState({ editSizeData });
              }} />
            </FormGroup>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateSize.bind(this)}>Update Size Details</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditSizeModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>

              <th>Size  Details</th>


            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {this.TowerMasterDetails(this.props.SizeDetails)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {

  return {
    SizeDetails: state.SizeDetails,


  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ displaySize }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySizeMaster)
