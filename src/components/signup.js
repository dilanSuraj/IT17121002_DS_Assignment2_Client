import React, { Component } from 'react';
import '../App';
import LoginComponent from './login';
import ReactDOM from 'react-dom';
import { Button, Form } from 'react-bootstrap';
import Axios from 'axios';
import swal from 'sweetalert2';


class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {

            name: '',
            email: '',
            password: '',
            cPassword: '',
            address: '',
            mobileNumber: '',
            NICNo: ''

        }

    }
    onChangeName = (e) => {
        this.setState({

            name: e.target.value

        });
    }

    onChangeEmail = (e) => {
        this.setState({

            email: e.target.value

        });
    }

    onChangePasword = (e) => {
        this.setState({

            password: e.target.value

        });
    }

    onChangeConfirmPasword = (e) => {
        this.setState({

            cPassword: e.target.value

        });
    }

    onChangeAddress = (e) => {
        this.setState({

            address: e.target.value

        });
    }

    onChangeMobileNumber = (e) => {
        this.setState({

            mobileNumber: e.target.value

        });
    }

    onChangeNIC = (e) => {
        this.setState({

            NICNo: e.target.value

        });
    }

    signup = () => {

        if (this.state.name == '' || this.state.email == '' || this.state.password == '' || this.state.cPassword == '' || this.state.address == '' || this.state.mobileNumber == '' || this.state.NICNo == '') {
            alert("Please fill the fields");
            return;
        }

        if (this.state.password != this.state.cPassword) {
            alert("Two passwords much match");
            return;
        }

        let user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            mobileNumber: this.state.mobileNumber,
            NICNo: this.state.NICNo
        }

        Axios.get('http://localhost:4001/user/' + user.email).then(res => {
            
            var userDetails = JSON.stringify(res.data);
            
            if (userDetails != '[]') {
                swal.fire({
                        title: "Email Error!!",
                        text: "Email Already exists",
                        type: "error",
                        timer: 1000,
                        showConfirmButton: true
                    }, function(){
                        console.log('home');
              window.location.href = "../index.js";
            });
            }
            else {
                Axios.post('http://localhost:4001/user/', user).then(() => {
                    swal.fire({
                        title: "Success!",
                        text: "Successfully sign up",
                        type: "success",
                        timer: 1000,
                        showConfirmButton: false
                    }, function () {
                       this.props.history.push('/');
                    });
                }

                ).catch(function (err) {
                    console.log(err);
                });
            }

        }).catch(function (err) {
            console.log(err);
        })



    }

    render() {

        return (
            <div className="container shadow-lg p-3 mb-5 bg-white rounded" style={{ marginTop: 120 }}>
                <Form>
                    <h3> Sign Up</h3>
                    <Form.Group>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" value={this.state.name} onChange={this.onChangeName} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail} />
                        <Form.Text className="text-muted">
                            We will never share your email anyone
                    </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePasword} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={this.state.cPassword} onChange={this.onChangeConfirmPasword} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" value={this.state.address} onChange={this.onChangeAddress} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter mobile number" value={this.state.mobileNumber} onChange={this.onChangeMobileNumber} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>NIC No</Form.Label>
                        <Form.Control type="text" placeholder="Enter NIC Number" value={this.state.NICNo} onChange={this.onChangeNIC} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.signup}>
                        SignUp
                </Button>
                </Form>
            </div>
        );
    }


}
export default Signup;