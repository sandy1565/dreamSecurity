import React, { Component } from 'react';
// import Country from './components/CountryMaster/CountryMaster';
// import Login from './components/LoginPage/Login';
// import ShowDetails from './components/LoginPage/showDetails';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import AdminDashboard from './container/admin-dashboard/admin-dashboard';
// import Registration from './components/Registration/Registration ';
import FlatMaster from './containers/flatMaster';
import FlatMasterDetails from './containers/flatMasterDetails';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>

            {/* <Route path='/admin-dashboard' component={AdminDashboard} /> */}
            <Route path='/flatmaster' exact component= {FlatMaster} />
            <Route path ='/flatmaster/flatmasterdetails' component ={FlatMasterDetails}/>
            {/* <Route path='/registration' component={Registration} /> */}
            {/* <Route path='/' exact component={ShowDetails} /> */}
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
