import React, { Component } from 'react';
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns
} from 'reactstrap';
import '../App.css';
import axios from 'axios';
import cardImg from '../assets/img/test.jpg';
import { Link } from "react-router-dom";


const Ticket = props => (
    <Card className="shadow-lg p-3 mb-5 bg-white rounded">
        <CardTitle>
             <b><h3>{props.ticket.trainName} Train <i className="fas fa-ticket-alt"></i></h3></b> </CardTitle>
        <CardImg top width="100%" src={cardImg} alt="Card image cap" />

        <CardText className="pt-3">
            <b>Ticket Price :</b> LKR {props.ticket.price}
        </CardText>
        <CardText className="pt-1">
            <b>Start Place :</b> {props.ticket.start}
        </CardText>
        <CardText className="pt-1">
            <b>Destination Place :</b>  {props.ticket.destination}
        </CardText>
        <CardText className="pt-1">
            <b>Arrival Time :</b>  {props.ticket.arrivalTime}
        </CardText>
        <CardText className="pt-1">
            <b>Departure Time :</b>  {props.ticket.departureTime}
        </CardText>
        <CardText className="pt-1">
            <b>Ticket Class :</b>  {props.ticket.ticketClass} Class
        </CardText>
        <CardText className="pt-1">
            <b>Available ticket Count :</b>  {props.ticket.avaialableQty} tickets
        </CardText>
        <div className="col-md-12 text-center"> 
            <a href={"/ticketbook/" + props.ticket.ticketId}>
               <Button className="btn btn-primary btn-lg disabled mr-2">
                      Book Now 
                 <i className="fas fa-book"></i>
               </Button>
            </a>
        </div>
    </Card>

);


export default class TicketList extends Component {

    constructor(props) {
        super(props);
        this.state = { tickets: [] };
    }

    componentDidMount() {
        axios.get('https://e-train-book-api.herokuapp.com/tickets/').then(res => {
            this.setState({
                tickets: res.data
            });
            
        }).catch(function (err) {
            console.log(err);
        });
    }

    //After adding this, we do not need to refresh the page to see the updated codes
    componentDidUpdate() {
        axios.get('https://e-train-book-api.herokuapp.com/tickets/').then(res => {
            if(this.state.tickets != res.data){
            this.setState({
                tickets: res.data
            });
        }
           
        }).catch(function (err) {
            console.log(err);
        });
    }

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


