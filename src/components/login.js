import React, { Component } from 'react';
import '../App';
import SignUpComponent from './signup';
import ReactDOM from 'react-dom';
import { Button, Form } from 'react-bootstrap';
import App from '../App';
import axios from 'axios';
import swal from 'sweetalert2';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            address: '',
            mobileNumber: '',
            NICNo: ''

        }
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    login = () => {
        axios.get('http://localhost:4001/user/' + this.state.email + '/' + this.state.password).then(res => {

            var userDetails = JSON.stringify(res.data);

            if (userDetails != '[]') {

                var name = res.data.name;
                var address = res.data.address;
                var mobileNumber = res.data.mobileNumber;
                var NICNo = res.data.NICNo;

                this.setState({
                    name: name,
                    address: address,
                    mobileNumber: mobileNumber,
                    NICNo: NICNo
                })

                swal.fire({
                    title: "Succesfull",
                    text: "Succesfully logged In",
                    type: "success",
                    timer: 1000,
                    showConfirmButton: true
                }, function () {
                    console.log('home');
                    window.location.href = "../index.js";
                });


            }
            else{

                 swal.fire({
                    title: "Error",
                    text: "Login Unsuccesful!",
                    type: "error",
                    timer: 1000,
                    showConfirmButton: true
                }, function () {
                    console.log('home');
                    window.location.href = "../index.js";
                });

            }


        }).catch(function (err) {
            console.log(err);
        });
    }

    render() {

        return (
            <div className="container shadow-lg p-3 mb-5 bg-white rounded" style={{ marginTop: 120 }}>
                <Form>
                    <h3> Login</h3>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail} />
                        <Form.Text className="text-muted">
                            We will never share your email anyone
                    </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.login}>
                        Login
                </Button>
                </Form>
            </div>
        );
    }


}
export default Login;