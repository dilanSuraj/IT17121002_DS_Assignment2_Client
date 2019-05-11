import React, { Component } from 'react';
import '../App';
import LoginComponent from './login';
import ReactDOM from 'react-dom';
import { Button, Form } from 'react-bootstrap';


class Signup extends Component {

    constructor(props) {
        super(props);
    }

    signup() {

        let dbURL_User = "http://localhost:4001/user/";

        const uname = this.refs.uname.value;
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const cpassword = this.refs.cpassword.value;
        const address = this.refs.address.value;
        const mobileNumber = this.refs.mobileNumber.value;
        const NICNo = this.refs.NICNo.value;

        if (uname == '' || email == '' || password == '' || cpassword == '' || address == '' || mobileNumber == '' || NICNo == '') {
            alert('One or more fields empty');
        }

        
        if (cpassword !== password) {
            alert('passwords do not match!');
        }

        else {
            var isFoundMail = false;

            fetch(dbURL_User + email, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                response => {
                    return response.json();
                }).then(data => {
                    var user = JSON.stringify(data);
                    console.log(user);

                    if (user != '[]') {
                        alert('Email is already in use');
                    }
                    else {
                        var data = {
                            "name": uname,
                            "email": email,
                            "password": password,
                            "address": address,
                            "mobileNumber": mobileNumber,
                            "NICNo": NICNo
                        };
                        console.log(data);

                        fetch(dbURL_User, {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(response => {
                            return response.json();
                        }).then(data => {
                            alert('Successful Signup');
                            ReactDOM.render(<LoginComponent />,
                                document.getElementById('root'));
                        }).catch(err => {
                            alert("Second " + err);
                        })
                    }
                }).catch(err => {
                    alert("First Err" + err);
                })
        }

    }
    login() {
        ReactDOM.render(<LoginComponent />, document.getElementById('root'));
    }

    render() {

        return (
            <Form>
                <h3> Sign Up</h3>
                <Form.Group>
                    <Form.Label>User Name</Form.Label> 
                    <Form.Control type="text" placeholder="Enter user name" ref="uname"/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref="email"/>
                    <Form.Text className="text-muted">
                       We will never share your email anyone
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref="password"/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref="cpassword"/>
                </Form.Group>
                 <Form.Group>
                    <Form.Label>Address</Form.Label> 
                    <Form.Control type="text" placeholder="Enter address" ref="address"/>
                </Form.Group>
                 <Form.Group>
                    <Form.Label>Mobile Number</Form.Label> 
                    <Form.Control type="text" placeholder="Enter mobile number" ref="mobileNumber"/>
                </Form.Group>
                 <Form.Group>
                    <Form.Label>NIC Number</Form.Label> 
                    <Form.Control type="text" placeholder="Enter NIC" ref="NICNo"/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={() =>{this.signup()}}>
                    SignUp
                </Button>
                <Button variant="primary" type="submit" onClick = {() => {this.login()}}>
                    Login
                </Button>
            </Form>
        );
    }


}
export default Signup;