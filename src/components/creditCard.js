import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';


export default class CreditCardPaymentDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            card_Payment: {
                email: '',
                cardNumber: '',
                cvc: '',
                total: '',
                subTotal: ''
            }
        }
    }

    onCardNumberChange = (e) =>{
        if(e){
            this.setState({
                card_Payment:{
                    cardNumber:e.target.value
                }
            });
        }
    }

    onCvcChange = (e) => {
       this.setState({
           card_Payment:{
               cvc:e.target.value
           }
       });
    }

    onChangePayment() {       
        this.props.newcardpayment(this.state.card_Payment);
        
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Credit Card Payment
                    </Modal.Title>
                </Modal.Header>

                <div className="modal-body">

                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control"
                                id="exampleInputEmail1" value={this.props.cardpayment.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Card Number</label>
                            <input type="text" className="form-control" value={this.state.card_Payment.cardNumber}
                                onChange={this.onCardNumberChange}
                                id="exampleInputPassword1" placeholder="Card Number" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">CVC</label>
                            <input type="text" className="form-control" value={this.state.card_Payment.cvc}
                                onChange={this.onCardNumberChange}
                                id="exampleInputPassword1" placeholder="CVC" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Total Payment</label>
                            <input type="text" className="form-control" value={this.props.cardpayment.total}
                                id="exampleInputPassword1" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Sub Total Payment</label>
                            <input type="text" className="form-control"
                                id="exampleInputPassword1" value={this.props.cardpayment.subTotal} />
                        </div>


                    </form>


                </div>

                <Modal.Footer>

                    <button type="button" className="btn btn-secondary"
                        data-dismiss="modal" onClick={this.props.onHide}>
                        Close
                </button>
                    <button type="button" className="btn btn-primary" onClick={this.onChangePayment.bind(this)}>
                        Save changes
                </button>


                </Modal.Footer>
            </Modal>
        );
    }
}
