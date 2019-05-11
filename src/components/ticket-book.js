import React, { Component } from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

export default class TicketBook extends Component {

    

    constructor(props) {
        super(props);

        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeTrainName = this.onChangeTrainName.bind(this);
        this.onChangeBookedSeatCount = this.onChangeBookedSeatCount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            price: 0,
            trainName: '',
            initialQty:0,
            dynamicQty: '',
            bookedQty:0,
            subTotal: 0,
            total:0,
            discountPercentage:0

        };



    }

    checkForDiscounts(){
      axios.get('http://localhost:4001/tickets/' + this.props.match.params.ticketId)
    }


    componentDidMount() {
        axios.get('http://localhost:4001/tickets/' + this.props.match.params.ticketId).then(res => {
            var ticketDetails = JSON.stringify(res);
            console.log(ticketDetails);
            if (ticketDetails != '[]') {
                for (var ticket of res.data) {
                    var res_price = ticket.price;
                    var res_trainName = ticket.trainName;
                    const initialAvailableQty = ticket.avaialableQty;
                    var res_avaialableQty = ticket.avaialableQty;
                    
                }
                this.setState({

                    price: res_price,
                    trainName: res_trainName,
                    initialQty:res_avaialableQty,
                    dynamicQty: res_avaialableQty
                })
            }
            else {
                alert('No Tickets are available');
            }

        }).catch(function (err) {
            console.log(err);
        })
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeTrainName(e) {
        this.setState({
            trainName: e.target.value
        });
    }

    onChangeBookedSeatCount(e) {
        

        var seatsToBook = e.target.value;
        this.setState({
            dynamicQty: this.state.initialQty-seatsToBook,
            bookedQty: seatsToBook,
            subTotal: seatsToBook * this.state.price
        });
    }




    onSubmit(e) {
        e.preventDefault();

        //Communicate with backend

        let newTicketBook = {

            price: this.state.price,
            trainName: this.state.trainName,
            dynamicQty: this.state.dynamicQty
        };

        this.props.history.push('/');
    }


    render() {
        return (
            <div className="container">
                <div style={{ marginTop: 20 }}>
                    <h3>Book your ticket in <b>{this.state.trainName}</b> train</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Price of a ticket : </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.price || ''}
                                onChange={this.onChangePrice} />
                        </div>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text># Tickets Available</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={this.state.dynamicQty}
                                />
                            <InputGroup.Prepend className="pl-3">
                                <InputGroup.Text># Tickets to book</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={this.state.bookedQty}
                                onChange={this.onChangeBookedSeatCount}/>
                        </InputGroup>

                        <div className="form-group">
                            <label>Sub Total : </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.subTotal}
                                onChange={this.onChangeBookedSeatCount} />
                        </div>

                        <div className="form-group">
                            <label>Total : </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.subTotal}
                                onChange={this.onChangeBookedSeatCount} />
                        </div>



                        <div className="form-group">
                            <input type="submit" value="Pay Now" className="btn btn-primary" />
                        </div>


                    </form>
                </div>
            </div>

        );
    }
}