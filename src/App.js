import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// =====Components============//
import {PrivateRoute} from './components/PrivateRoute/privateRoute';
import Parking from './components/Parking/Parking';
// ========Containers =========//
import Login from './containers/Login/Login';
// import QR from './containers/QR/QR Code';
import UserDetails from './containers/UserDetails/UserDetails';
import Registration from './containers/Registration/Registration';
import AdminDashboard from './containers/AdminDashboard/AdminDashboard';
import OwnerDashboard from './containers/OwnerDashboard/OwnerDashboard';
import SuperDashboard from './containers/SuperDashboard/SuperDashboard';
import TenantDashboard from './containers/TenantDashboard/TenantDashboard';
import VendorDashboard from './containers/VendorDashboard/VendorDashboard';
import ParkingMaster from './containers/ParkingMaster/ParkingMaster';
// import ParkingMaster from './containers/ParkingMaster/ParkingMaster';
// import Parking from './components/Parking/Parking';

import SocietyManagement from './containers/SocietyManagement/SocietyMangement';
import TowerMaster from   './containers/TowerMaster/tower-master';
import  DisplayTowerMaster from './containers/TowerMaster/display-tower-master';
import SizeMaster from   './containers/SizeMaster/size-master';
import  EventMaster from './containers/EventMaster/event-master';
import DisplayEventMaster from './containers/EventMaster/display-event-master';
import DisplaySizeMaster from './containers/SizeMaster/display-size-master';
import FlatMaster from './containers/Flat_master/flatMaster';
import FlatMasterDetails from './containers/Flat_master/flatMasterDetails';
// import AssetManagement from './containers/Asset/Asset_Management';
// import AssetManagementDetails from './containers/Asset/Asset-Management-Details';
import serviceMaster from './containers/VendorMangement/ServiceMaster/serviceMaster';
import displayServices from './containers/VendorMangement/ServiceMaster/displayServiceMaster';
import vendorMaster from './containers/VendorMangement/VendorMaster/vendorMaster';
import displayVendorMaster from './containers/VendorMangement/VendorMaster/displayVendorMaster';
// import flatDetailMaster from './containers/FlatDetailMaster/flatDetailMaster';
// import flatDetails from './containers/FlatDetailMaster/flatDetails';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Login}/>
            
            <Route path='/login' component={Login}/>
            <PrivateRoute path='/superDashboard' exact component={SuperDashboard} />
            <Route path='/superDashboard' exact component={SuperDashboard} />
            <Route path='/adminDashboard' component={AdminDashboard} />
            <Route path='/ownerDashboard' component={OwnerDashboard} />
            <Route path='/tenantDashboard' component={TenantDashboard} />
            <Route path='/vendorDashboard' component={VendorDashboard} />
            {/* <Route path ='/superDashboard/QR' exact component={QR}/> */}
            <Route path='/superDashboard/registration' component={Registration} />
            <Route path ={'/superDashboard/user_details'} component={UserDetails} />
            <Route path='/superDashboard/parking_master' component={ParkingMaster} />
            <Route path ='/superDashboard/display-tower' component ={DisplayTowerMaster} />
            <Route path ='/superDashboard/display-size' component ={DisplaySizeMaster} />
            <Route path ='/superDashboard/towermaster'  component ={TowerMaster} />
            <Route path = '/superDashboard/sizemaster'  component ={SizeMaster} />
            <Route path ='/superDashboard/event' component ={EventMaster}/>
            <Route path='/superDashboard/flatmaster' exact component= {FlatMaster}/>
            <Route path ='/superDashboard/flatmaster/flatmasterdetails' component ={FlatMasterDetails}/>
            <Route path ='/superDashboard/societyManagement' component={SocietyManagement}/>
            <Route path ='/superDashboard/display-event'component ={DisplayEventMaster}/>
            {/* <Route path ='/superDashboard/assetmanagement'component ={AssetManagement}/> */}
            {/* <Route path ='/superDashboard/assetmanagement/assetmanagementdetails'component ={AssetManagementDetails}/> */}
            <Route path='/superDashboard/add_parking/new' component ={Parking} />
            <Route path='/superDashboard/serviceMaster' component={serviceMaster} />

            <Route path ='/superDashboard/vendorMaster'component ={vendorMaster}/>
            <Route path= '/superDashboard/displayVendorMaster' component={displayVendorMaster}/>
            <Route path ='/superDashboard/displayServices'component ={displayServices}/>
            {/* <Route path ='/superdashboard/flatDetailMaster' component ={flatDetailMaster}/>
            <Route path ='/superdashboard/flatDetails' component ={flatDetails}/> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
