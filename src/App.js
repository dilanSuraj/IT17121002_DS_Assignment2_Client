import React, { Component } from 'react';
import SearchList from './components/ticketlist';
import TicketBook from './components/ticket-book';
import TicketCart from './components/add-to-cart';
import NavBar from './components/navBar';
import './App.css';

import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class App extends Component {


  render() {
        return (             
                <Router>
                    <Route path="/*" exact component={NavBar}/>
                    <Route path="/" exact component={SearchList}/>
                    <Route path="/ticketbook/:ticketId"  component={TicketBook}/>
                    <Route path="/cart/:id"  component={TicketCart}/>
                </Router>

        );
    }


}

