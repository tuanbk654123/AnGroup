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
