import React, { Component } from 'react';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import CreditCardDlg from './creditCard';
import MobilePaymentDlg from './dialogPay';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


export default class TicketBook extends Component {



    constructor(props) {
        super(props);

        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeTrainName = this.onChangeTrainName.bind(this);
        this.onChangeBookedSeatCount = this.onChangeBookedSeatCount.bind(this);
       

        this.state = {
            price: 0,
            trainName: '',
            initialQty: 0,
            dynamicQty: '',
            bookedQty: 0,
            subTotal: 0,
            departureTime:'',
            arrivalTime:'',
            bookedDate:'',
            total: 0,
            useremail:'',
            usermobile:'',
            discountPercentage: 0,
            employeeStatus: '',
            payment_mobilePayment: false,
            payment_creditCard: false,
            bookingDate:'',
            ticket: {
                ticketId:'',
                availableQty: ''
            },
            mobile_payment: {

                email: '',
                pin: '',
                total: 0,
                subTotal: 0,
                mobileNumber: '',
                bookingDate:''
            },
            card_Payment: {
               
                email: '',
                cardNumber: '',
                cvc: '',
                total: 0,
                subTotal: 0,
                bookingDate:''
            }


        };



    }
    componentDidMount() {

        let email = localStorage.getItem('email');
        let mobileNumber = localStorage.getItem('mobile');

        if(email == ''|| mobileNumber == ''){
           this.props.history.push(`/login`);
        }
        this.setState({
            useremail: email,
            usermobile: mobileNumber
        })

        axios.get('https://e-train-book-api.herokuapp.com/discount/').then(res => {

            var discountAmt = res.data.discountAmt;
            var employeeStatus = res.data.employeeStatus;

            this.setState({
                discountPercentage: discountAmt,
                employeeStatus: employeeStatus
            })

        }).catch(function (err) {
            console.log(err);
        });
        axios.get('https://e-train-book-api.herokuapp.com/tickets/' + this.props.match.params.ticketId).then(res => {
            var ticketDetails = JSON.stringify(res);
            var availableTicketCount = this.state.dynamicQty;

            if (ticketDetails != '[]') {
                for (var ticket of res.data) {
                    var res_price = ticket.price;
                    var res_trainName = ticket.trainName;
                    var res_avaialableQty = ticket.avaialableQty;
                    var res_departureTime = ticket.departureTime;
                    var res_arrivalTime = ticket.arrivalTime;
                    var res_ticketClass = ticket.ticketClass

                }
                this.setState({

                    price: res_price,
                    trainName: res_trainName,
                    initialQty: res_avaialableQty,
                    dynamicQty: res_avaialableQty,
                    departureTime: res_departureTime,
                    ticketClass: res_ticketClass,
                    arrivalTime: res_arrivalTime,
                    ticket: {
                        ticketId:this.props.match.params.ticketId,
                        availableQty: availableTicketCount
                    }

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
    onChangeBookingdate = (e) =>{
        this.setState({
            bookingDate: e.target.value
        });
    }

    onChangeTrainName(e) {
        this.setState({
            trainName: e.target.value
        });
    }
    onChangeBookedSeatCount(e) {


        var seatsToBook = e.target.value;
        var subTotalAmt = seatsToBook * this.state.price;
        var totalPrice = (subTotalAmt - (subTotalAmt * this.state.discountPercentage));
        this.setState({
            dynamicQty: this.state.initialQty - seatsToBook,
            bookedQty: seatsToBook,
            subTotal: seatsToBook * this.state.price,
            total: totalPrice
        });
        

    }
    onChangeCreditCardPayment(newPayment) {

        this.setState({
            card_Payment: {

                email: this.state.email,
                cardNumber: newPayment.cardNumber,
                cvc: newPayment.cvc,
                total: this.state.total,
                subTotal: this.state.subTotal,
                bookingDate:this.state.bookingDate
            }
        });
        var dynamicQty = this.state.dynamicQty;
         this.setState({
                    ticket: {
                        ticketId:this.state.ticket.ticketId,
                        availableQty: this.state.dynamicQty
                    }

                });

        axios.post('https://e-train-book-api.herokuapp.com/creditcard/', this.state.card_Payment).then(
            alert('Successfully added a ticket payment using credit payment, please check your phone for confirmation')
        ).catch(function (err) {
            console.log(err);
        });

        axios.put('https://e-train-book-api.herokuapp.com/tickets/', this.state.ticket).then(()=>{ 
           console.log("Available ticket count updated");}
        ).catch(function (err) {
            console.log(err);
        });
    }

    onChangeMobilePayment(newPayment) {


        this.setState({
            mobile_payment: {

                email: this.state.email,
                pin: newPayment.pin,
                total: this.state.total,
                subTotal: this.state.subTotal,
                mobileNumber: this.state.mobileNumber,
                bookingDate:this.state.bookingDate
            }
        });
        axios.post('https://e-train-book-api.herokuapp.com/dialogpay/', this.state.mobile_payment).then(
            alert('Successfully added a ticket payment using mobile payment, please check your phone for confirmation')
        ).catch(function (err) {
            console.log(err);
        });

        var dynamicQty = this.state.dynamicQty;
         this.setState({
                    ticket: {
                        ticketId:this.state.ticket.ticketId,
                        availableQty: this.state.dynamicQty
                    }

                });
        axios.put('https://e-train-book-api.herokuapp.com/tickets/', this.state.ticket).then(()=>{ 
           console.log("Available ticket count updated");}
        ).catch(function (err) {
            console.log(err);
        });

    }


    render() {

        let mobile_payment_show = () =>
            this.setState({
                payment_mobilePayment: false
            });

        let credit_Card_payment_show = () => this.setState({ payment_creditCard: false });
        return (
            <div className="container shadow-lg p-3 mb-5 bg-white rounded" style={{ marginTop: 120 }}>
                <div style={{ marginTop: 20 }}>
                    <h3>Book your ticket in <b><i>{this.state.trainName} - Class {this.state.ticketClass}</i></b> train</h3>
                    <form>
                        <br />
                        <h5>Employee Status: <b>{this.state.employeeStatus}</b></h5>
                        <br />

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Price of a ticket : </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={this.state.price}
                                onChange={this.onChangePrice} />
                        </InputGroup>

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
                                onChange={this.onChangeBookedSeatCount} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Sub Total : </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={this.state.subTotal}
                                onChange={this.onChangeBookedSeatCount} />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Total : </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={this.state.total}
                                onChange={this.onChangeBookedSeatCount} />
                        </InputGroup>

                       
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Train Departure Time</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={this.state.departureTime}
                            />
                            <InputGroup.Prepend className="pl-3">
                                <InputGroup.Text>Train Arrival Time</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={this.state.arrivalTime}
                                 />
                        </InputGroup>

                         <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Booking Date</InputGroup.Text>
                            </InputGroup.Prepend >
                            <FormControl  type="date"
                                          name="date"
                                          id="exampleDate"
                                           value={this.state.bookedDate} onChange={this.onChangeBookingdate}/>
                        </InputGroup>

          
                        <ButtonToolbar>
                            <Button
                                variant="primary mr-2"
                                onClick={() => this.setState({
                                    payment_mobilePayment: true,
                                    payment_creditCard: false,
                                     ticket: {
                        ticketId:this.state.ticket.ticketId,
                        availableQty: this.state.dynamicQty
                    },
                                    mobile_payment: {
                                        email: this.state.useremail,
                                        total: this.state.total,
                                        subTotal: this.state.subTotal,
                                        mobileNumber: this.state.usermobile,
                                        pin: this.state.pin
                                    }

                                })}>
                                Mobile Card Payment
                            </Button>

                            <Button
                                variant="primary mr-2"
                                onClick={() => this.setState({
                                    payment_mobilePayment: false,
                                    payment_creditCard: true,
                                    ticket: {
                        ticketId:this.state.ticket.ticketId,
                        availableQty: this.state.dynamicQty
                    },
                                    card_Payment: {

                                        email: this.state.useremail,
                                        cardNumber: this.state.cardNumber,
                                        cvc: this.state.cvc,
                                        total: this.state.total,
                                        subTotal: this.state.subTotal
                                    }

                                })}>
                                Credit Card Payment
                            </Button>

                            <MobilePaymentDlg
                                show={this.state.payment_mobilePayment}
                                onHide={mobile_payment_show}
                                mobilepayment={this.state.mobile_payment}
                                newmobilepayment={this.onChangeMobilePayment.bind(this)}

                            />

                            <CreditCardDlg
                                show={this.state.payment_creditCard}
                                onHide={credit_Card_payment_show}
                                cardpayment={this.state.card_Payment}
                                newcardpayment={this.onChangeCreditCardPayment.bind(this)}
                            />
                        </ButtonToolbar>

                    </form>
                </div>
            </div>

        );
    }
}