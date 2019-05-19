import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';


export default class MobilePaymentDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mobile_payment: {

                email: '',
                pin: '',
                total: 0,
                subTotal: 0,
                mobileNumber: ''
            }
        }
    }

    onPINNumberChange = (e) => {
        if (e) {
            this.setState({
                mobile_payment: {
                    pin: e.target.value,
                    email: this.props.mobilepayment.email,
                    total: this.props.mobilepayment.total,
                    subTotal: this.props.mobilepayment.subTotal,
                    mobileNumber: this.props.mobilepayment.mobileNumber
                }
            })
        }
    }
    onChangePayment() {

        this.props.newmobilepayment(this.state.mobile_payment);
       
    }

    render() {

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="col-md-12 text-center">
                        Mobile Card Payment
                    </Modal.Title>
                </Modal.Header>

                <div className="modal-body">

                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control"
                                id="exampleInputEmail1" value={this.props.mobilepayment.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Pin Number</label>
                            <input type="text" className="form-control" onChange={this.onPINNumberChange.bind(this)}
                                id="exampleInputPassword1" value={this.state.mobile_payment.pin} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Total Payment</label>
                            <input type="text" className="form-control"
                                id="exampleInputPassword1" value={this.props.mobilepayment.total} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Sub Total Payment</label>
                            <input type="text" className="form-control"
                                id="exampleInputPassword1" value={this.props.mobilepayment.subTotal} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Mobile Number</label>
                            <input type="text" className="form-control"
                                id="exampleInputPassword1" value={this.props.mobilepayment.mobileNumber} />
                        </div>


                    </form>


                </div>

                <Modal.Footer>

                   <button type="button" className="btn btn-secondary"
                        data-dismiss="modal" onClick={this.props.onHide}>
                        Close
                </button>
                    <button type="submit" className="btn btn-primary" onClick={this.onChangePayment.bind(this)}>
                        Save changes
                </button>


                </Modal.Footer>
            </Modal>
        );
    }
}
