import React, { Component } from 'react';
import TicketList from './components/ticketlist';
import TicketBook from './components/ticket-book';
import NavBar from './components/navBar';
import SignUp from './components/signup';
import Login from './components/login';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {

    render() {

        return (
            <Router>
                <Route path="/*" exact component={NavBar} />
                <Route path="/" exact component={TicketList} />
                <Route component={TicketBook}  path="/ticketbook/:ticketId" />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
            </Router>

        );
    }


}

