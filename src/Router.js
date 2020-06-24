import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
// // Pages
import Login from './pages/Login';
import Shop from './pages/Shop';
import Firstime from './pages/Firstime';
import NextStep from './pages/NextStep';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import StoreDetails from './pages/StoreDetails';
import Orders from './pages/Orders';
import About from './pages/About';

const RouterComponent = props => {
  console.disableYellowBox = true;

  return (
    <Router>
      <Stack key="root">
        <Scene key="Login" component={Login} initial hideNavBar />
        <Scene key="Firstime" component={Firstime} hideNavBar />
        <Scene key="NextStep" component={NextStep} hideNavBar />
        <Scene key="Shop" component={Shop} hideNavBar />
        <Scene key="Products" component={Products} hideNavBar />
        <Scene key="Profile" component={Profile} hideNavBar />
        <Scene key="Search" component={Search} hideNavBar />
        <Scene key="ProductDetails" component={ProductDetails} hideNavBar />
        <Scene key="StoreDetails" component={StoreDetails} hideNavBar />
        <Scene key="Orders" component={Orders} hideNavBar />
        <Scene key="About" component={About} hideNavBar />
      </Stack>
    </Router>
  );
};
export default RouterComponent;
