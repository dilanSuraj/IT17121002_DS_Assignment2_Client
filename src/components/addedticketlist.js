import React, { Component } from 'react';
import '../App.css';
import CreditCard from './creditCard';
import DialogPay from './dialogPay';
import ReactDOM from 'react-dom';

class AddedTicketList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            NICNo: this.props.NICNo,
            email: this.props.email
        }
    }

    getCardPay = function (tot) {
        ReactDOM.render(
            <CreditCard total={tot}
                name={this.state.name}
                NICNo={this.state.NICNo}
                email={this.state.email} />, document.getElementById('root')
        )
    }

    dialogPay = function (tot) {
        ReactDOM.render(
            <DialogPay total={tot}
                name={this.state.name}
                NICNo={this.state.NICNo}
                email={this.state.email} />, document.getElementById('root')
        )
    }

    render() {
        if (this.props.ticketCart != undefined) {
            var TicketCartList = this.props.ticketCart.map((Ticket) => {
                return (
                    <div key={Ticket}>
                        <p>{Ticket}</p>
                    </div>
                )
            })
        }
        else{
           return(
                    <div className="col-md-5">
                      <h5>Cart is empty</h5>
                    </div>
                )
        }

        const prices = this.props.total;
        const qty = this.props.totalQty;
        var tot = 0;
        var totalQty = qty.length;

        for (var x = 0; x < prices.length; x++) {
            tot = tot + prices[x] * parseInt(qty[x], 10);
        }
        return (
            <ul>
                <h4>Ticket Cart</h4>
                {TicketCartList}
                <p>Total :{tot}</p>
                <p>Payment Method</p>
                <div className="row">
                    <div className="col-md-5">
                        <button onClick={() => this.getCardPay(tot)} className="btn btn-primary btn-sm">
                            Card Payment
                       </button>
                    </div>
                    <div className="leftpadding">
                        <button onClick={() => this.dialogPay(tot)} className="btn btn-primary btn-sm">
                            Dialog Payment
                       </button>
                    </div>
                </div>
            </ul>
        );
    }
}

export default AddedTicketList;