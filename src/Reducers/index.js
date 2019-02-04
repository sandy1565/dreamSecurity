import { combineReducers } from 'redux';
import userDetail from './userDetail/userDetail';
import loginReducer from './loginReducer/loginReducer';
import flats from './flatMasterDetailReducer/flatMasterDetailReducer';
import flat from './flatMasterReducer/flatMasterReducer';
import TowerDetails from './towerReducer/towerReducer';
import EventDetails from './eventMasterReducer/eventMasterReducer';
import serviceMasterReducer from './vendorMasterReducer/serviceMasterReducer';
import displayServiceMasterReducer from './vendorMasterReducer/displayServiceMasterReducer';
import vendorMasterReducer from './vendorMasterReducer/vendorMasterReducer';
import SizeDetails from './sizeReducer/sizeReducer';
import societyReducer from './societyReducer/societyReducer';
import parkingDetail from './parkingReducer/parkingReducer';
import personDetails from './personReducer/personReducer';

const rootReducer = combineReducers({
    loginReducer,
    userDetail,
    TowerDetails,
    SizeDetails,
    flat,
    EventDetails,
    parkingDetail,
    societyReducer,
    flats,
    serviceMasterReducer,
    displayServiceMasterReducer,
    vendorMasterReducer,
    societyReducer,
    personDetails
})
export default rootReducer;