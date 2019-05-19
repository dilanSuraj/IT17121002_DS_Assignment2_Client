import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class AddToCart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            trainName:'',
            cart: {
                ticketId: '',
                Date: '',
                qty: 0
            }
        }
    }

    onQtyChange = (e) => {
        if (e) {
            this.setState({
                cart: {
                    qty: e.target.value,
                    ticketId: this.props.oldCart.ticketId,
                    Date: this.props.oldCart.Date
                }
            })
        }
    }
    onChangeCart() {

        this.props.newlyAddedCart(this.state.cart);
       
    }

    componentDidMount() {

        axios.get('http://localhost:4001/tickets/' + this.props.match.params.ticketId).then(res => {
            var ticketDetails = JSON.stringify(res);
            
            if (ticketDetails != '[]') {
                for (var ticket of res.data) {                  
                    var res_trainName = ticket.trainName;
                }
                this.setState({                 
                    trainName: res_trainName,                  
                })
            }
            else {
                alert('No Tickets are available');
            }

        }).catch(function (err) {
            console.log(err);
        })
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
                        Add To Cart - <b><i>{this.state.trainName} Train</i></b>
                    </Modal.Title>
                </Modal.Header>

                <div className="modal-body">

                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Ticket Count</label>
                            <input type="text" className="form-control" onChange={this.onQtyChange.bind(this)}
                                id="exampleInputPassword1" value={this.state.cart.qty} />
                        </div>
                    </form>


                </div>

                <Modal.Footer>

                    <button type="button" className="btn btn-secondary"
                        data-dismiss="modal">
                        Close
                </button>
                    <button type="submit" className="btn btn-primary" onClick={this.onChangeCart.bind(this)}>
                        Add To Cart
                </button>


                </Modal.Footer>
            </Modal>
        );
    }
}
