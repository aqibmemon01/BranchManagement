import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import history from './History';
import StudentHome from './components/StudentHome';
import CompanyHome from './components/CompanyHome';
import AdminHome from './components/AdminHome';
import Login from './Pages/LoginPage';
import LoginType from './Pages/LoginType';
import SignUp from './Pages/SignUp';
import BlockPage from './Pages/BlockPage'
import AddPostCompany from './components/AddPostCompany';
import AddPostStudent from './components/AddPostStudent';



class Routers extends Component {
    render() {
        history.push('/Login')
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/Home/Admin" component={AdminHome} />
                    <Route exact path="/Home/Student" component={StudentHome} />
                    <Route exact path="/Home/Company" component={CompanyHome} />
                    <Route exact path="/Home/Company/PostJob" component={AddPostCompany} />
                    <Route exact path="/Home/Student/PostProfile" component={AddPostStudent} />
                    <Route exact path="/LoginType" component={LoginType} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/SignUp/:Type" component={SignUp} />

                    <Route exact path="/Blocked" component={BlockPage} />
                </div>
            </Router>
        )
    }
}

export default Routers;