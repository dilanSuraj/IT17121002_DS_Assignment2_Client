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
            total: 0,
            discountPercentage: 0,
            employeeStatus: '',
            payment_mobilePayment: false,
            payment_creditCard: false,

            mobile_payment: {

                email: '',
                pin: '',
                total: 0,
                subTotal: 0,
                mobileNumber: ''
            },
            card_Payment: {
                creditCardPaymentId: '',
                email: '',
                cardNumber: '',
                cvc: '',
                total: 0,
                subTotal: 0,
                userId: ''
            }


        };



    }
    componentDidMount() {

        axios.get('http://localhost:4001/discount/').then(res => {

            var discountAmt = res.data.discountAmt;
            var employeeStatus = res.data.employeeStatus;

            this.setState({
                discountPercentage: discountAmt,
                employeeStatus: employeeStatus
            })

        }).catch(function (err) {
            console.log(err);
        });
        axios.get('http://localhost:4001/tickets/' + this.props.match.params.ticketId).then(res => {
            var ticketDetails = JSON.stringify(res);
            if (ticketDetails != '[]') {
                for (var ticket of res.data) {
                    var res_price = ticket.price;
                    var res_trainName = ticket.trainName;
                    var res_avaialableQty = ticket.avaialableQty;

                }
                this.setState({

                    price: res_price,
                    trainName: res_trainName,
                    initialQty: res_avaialableQty,
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
                subTotal: this.state.subTotal
            }
        });
        axios.post('http://localhost:4001/creditcard/', this.state.card_Payment).then(
            alert('Successfully added a ticket payment using credit card, please check your mail for confirmation')
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
                mobileNumber: this.state.mobileNumber
            }
        });
        axios.post('http://localhost:4001/dialogpay/', this.state.mobile_payment).then(
            alert('Successfully added a ticket payment using mobile payment, please check your phone for confirmation')
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
                    <h3>Book your ticket in <b><i>{this.state.trainName}</i></b> train</h3>
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

                        <ButtonToolbar>
                            <Button
                                variant="primary mr-2"
                                onClick={() => this.setState({
                                    payment_mobilePayment: true,
                                    payment_creditCard: false,
                                    mobile_payment: {
                                        email: 'dilan.amarasinghe214263@gmail.com',
                                        total: this.state.total,
                                        subTotal: this.state.subTotal,
                                        mobileNumber: '+94754494954',
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
                                    card_Payment: {

                                        email: 'dilan.amarasinghe214263@gmail.com',
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