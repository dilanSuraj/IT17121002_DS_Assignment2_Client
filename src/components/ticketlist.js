import React, { Component } from 'react';
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns
} from 'reactstrap';
import '../App.css';
import axios from 'axios';
import cardImg from '../assets/img/test.jpg';
import {Link} from "react-router-dom";


const Ticket = props => (
    <Card>
        <CardTitle><b><h3>{props.ticket.trainName} Train <i className="fas fa-ticket-alt"></i></h3></b> </CardTitle>
        <CardImg top width="100%" src={cardImg} alt="Card image cap" />
        
        <CardText><b>Ticket Price :</b> LKR {props.ticket.price}</CardText>
        <a href={"/ticketbook/" + props.ticket.ticketId}><Button className="btn btn-primary btn-lg disabled mr-2">Book Now <i className="fas fa-book"></i></Button></a>
        {/* <Link to={"/ticketbook/"+props.ticketId} className="btn btn-primary">Edit</Link> */}
        <a href={"/cart/" + props.ticket.ticketId}><Button className="btn btn-primary btn-lg disabled mr-2">Add to Cart <i className="fas fa-shopping-cart"></i></Button></a>
   </Card>

);


export default class TicketList extends Component {

    constructor(props) {
        super(props);
        this.state = { tickets: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:4001/tickets/').then(res => {
            this.setState({
                tickets: res.data
            });
            console.log(res.data);
        }).catch(function (err) {
            console.log(err);
        });
    }

    // //After adding this, we do not need to refresh the page to see the updated codes
    // componentDidUpdate() {
    //     axios.get('http://localhost:4001/tickets/').then(res => {
    //         this.setState({
    //             tickets: res.data
    //         });
    //         console.log(res.data);
    //     }).catch(function (err) {
    //         console.log(err);
    //     });
    // }

    ticketList() {
        return this.state.tickets.map(function (currentticket, i) {
            return <Ticket ticket={currentticket} key={i} />;
        })
    }

    render() {
        return (
            <CardColumns>
                {this.ticketList()}
            </CardColumns>

        );
    }
}


