
import React,{ Component } from 'react';
import './QRCode.css';
import QRCode from 'qrcode.react';
import { getQr } from '../../Actions/Flat_action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// TODO: live update demo
class QR extends React.Component {
  constructor(props){
    super(props);
     this.state = {
      value:{
             userName: '',
             firstName:'',
             lastName:'',
             email:'',
             contact:'',
             description:''

       }
      
    };
  }
  

    newQ=(item)=>{
        console.log('gfj',item)
        let{ value } =this.state;
        value.userName=item.QR1.userName;
        value.firstName= item.QR1.firstName;
        value.lastName=item.QR1.lastName;
        value.email=item.QR1.email;
        value.contact=item.QR1.contact;
        value.description=item.QR1.description;
        this.setState({value})
        // console.log('my',this.state)
        // console.log(this.state)
        // this.setState({value:item.sizeTypethis.state.name})

    }
  
  
    // update=({QR1})=>{
    //     console.log('shub',QR1)
    //     if(QR1){
    //            return(
    //             QR1.map((item) =>{
                  
    //                 this.newQ(item)
                    
    //                 // this.setState({
    //                 //     value: item.societyName
                       
    //                 //   });
    //                 // return(
    //                 //     <option key={item.societyId} value={item.societyId}>
    //                 //      {item.societyName}
    //                 //     </option>
    //           //       // )
    //             })
    //            )
             
    //      }
    // //   this.setState({
    // //     value: 'shubangh'
       
    // //   });
    // };
    newQR=()=>{
      console.log('hii')
      
        this.newQ(this.props.flat) ;
        // this.setState({value:'aakashg'})
        // console.log(this.state)
    }
    
    // newCode=()=>{
    //    this.newQR(this.props.flat);
    // }

    componentDidMount(){
        this.props.getQr();
        // window.addEventListener('load', this.update(this.props.flat));
       
        // this.update(this.props.flat)
        
        // console.log('jjjj')
    }

    // componentDidUpdate(){
    //   this.newQR()
    // }
    
    render() {
      return (
        <div>
        <div>
         {/* {this.newQR} */}
          <QRCode className="QR"
         
          // onClick={this.newQR}
            value={this.state.value.userName +"  "+
                   this.state.value.firstName+"  "+
                   this.state.value.lastName+"  "+
                   this.state.value.email+"  "+
                   this.state.value.contact+"  "+
                   this.state.value.description}
            // name={this.state.name}
           
          /><br/><br/>
        
         {/* {(function () {
           this.newQR();
              }())} */}
        <button onClick= {this.newQR}>Generate QR Code</button>
        </div>
         {/* {this.newQR} */}
           </div>
      );
  
    }
    // componentWillUpdate(){
      
    //  }
    
    
  }
  
  

function mapStateToProps(state) {
    // console.log(state)
    return {
        flat: state.flat
        
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators( {getQr} ,dispatch)

}

export  default connect(mapStateToProps,mapDispatchToProps) (QR);