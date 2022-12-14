//import { useEffect } from 'react';
import './App.css';
//import userService from './api/userService';
import {  Route, Switch } from 'react-router-dom';
import Login from './components/Layout/login/Login';
import Home from './components/Layout/home/Home';
import User  from './components/Layout/user/User';
import { NotFound, PrivateRoute} from './components/common'


import SigninOidc from './components/Layout/login/signin-oidc';
import Role from './components/Layout/role/Role';
import History from './components/Layout/history/History';
import ImportPrice from './components/Layout/importPrice/ImportPrice';
import ImportReport from './components/Layout/importReport/ImportReport';
import ImportProcess from './components/Layout/importProcess/ImportProcess';
import Customer from './components/Layout/customer/Customer';
import ExportPrice from './components/Layout/exportPrice/ExportPrice';
import ExportProcess from './components/Layout/exportProcess/ExportProcess';
import ExportReport from './components/Layout/exportReport/ExportReport';

function App() {
  // useEffect( () => {
  //   userService.getAll().then((respone) => console.log(respone))
  // }

  // );
//console.log("isLogging: ",isLogging);

  return (
      <div>
       <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/importPrice">
            <ImportPrice />
          </PrivateRoute>
          <PrivateRoute path="/exportProcess">
            <ExportProcess />
          </PrivateRoute>
          <PrivateRoute path="/exportPrice">
            <ExportPrice />
          </PrivateRoute>
          <PrivateRoute path="/exportReport">
            <ExportReport />
          </PrivateRoute>
          <PrivateRoute path="/importReport">
            <ImportReport />
          </PrivateRoute>
          <PrivateRoute path="/importProcess">
            <ImportProcess />
          </PrivateRoute>
          <PrivateRoute path="/customer">
            <Customer />
          </PrivateRoute>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/users">
            <User />
          </PrivateRoute>
          <PrivateRoute path="/role">
            <Role />
          </PrivateRoute>
          <PrivateRoute path="/loginhistory">
            <History />
          </PrivateRoute>
          
          <Route path="/signin-oidc">
            <SigninOidc />
          </Route>
        
          <Route>
            <NotFound />
          </Route>

          {/* <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/user" component={User}/>
          <Route exact path="/signin-oidc" component={SigninOidc}/>
          <Route>
            <NotFound />
          </Route> */}
        </Switch>
      </div>
  );
}

export default App;
