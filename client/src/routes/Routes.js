import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../components/login/LoginPage";
import HomePage from '../components/home/HomePage'
import Banner from '../components/banner/Banner'
import UserPage from '../components/userPage/UserPage'
const Routes = () => {
    return (
        <Router>
            <Banner/>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/login"  component={LoginPage}/>
                <Route path="/user/:userId" component={UserPage}/>
            </Switch>
        </Router>
    )
}

export default Routes;