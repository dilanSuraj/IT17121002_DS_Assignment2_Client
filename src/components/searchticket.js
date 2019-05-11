import React, {Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import '../App.css';

class SearchTicket extends Component{

    getTicket(e){
        
         
        e.preventDefault();
        var dbURL_Ticket = "http://localhost:4001/tickets/";
        const ticketId = this.refs.ticketId.value;
        const update = this.props;
        
        var data = {
            "ticketId":ticketId
        }

        console.log(data.ticketId);

        fetch(dbURL_Ticket+data.ticketId, {
            method:'GET',
            headers: {'Content-Type':'application/json'}
        }).then(response =>{
            
            return response.json();
            
        }).then(data =>{
            update.callUpdate(data);
        }).catch(err =>{
            alert(err);
        })
    }

    render(){
        return(
            <Form>
                <h3> Search Ticket</h3>

                 <Form.Group>
                    <Form.Label>TicketID</Form.Label> 
                    <Form.Control type="text" placeholder="Enter TicketID" ref="ticketId"/>
                </Form.Group>
                
                
                <Button variant="primary" type="submit" onClick = {() => {this.getTicket()}}>
                    Search
                </Button>
            </Form>
        );
    }
}

export default SearchTicket;