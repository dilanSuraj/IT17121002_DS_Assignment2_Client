import React, { Component } from 'react';
import '../App';
import SignUpComponent from './signup';
import ReactDOM from 'react-dom';
import { Button, Form } from 'react-bootstrap';
import App from '../App';



class Login extends Component {

    toggle = function(e) {

        let dbURL_User = "http://localhost:4001/user/";

        
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        

        if (email == '' || password == '') {
            alert('Email or Password is empty');
        }
      
        else {
            var credentials = {
                "email":email,
                "password":password
            };

            var count = false;

            fetch(dbURL_User + credentials.email+'/'+credentials.password, {
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
                        console.log(user);
                        count = true;
                        console.log(data);
                        alert("Login Successful!");

                        for(var user of data){
                            var name = user.name;
                            var NICNumber = user.NICNo;
                        }
                        ReactDOM.render(
                            <App name={name} NICNo={NICNumber} email={email}/>, document.getElementById('root')
                        )
                    }
                    else {
                        alert('Invalid username or password');
                    }
                }).catch(err => {
                    alert("First Err" + err);
                })

                if(count == true){
                    ReactDOM.render(<App/>, document.getElementById('root'));
                }
                else{
                    ReactDOM.render(<Login/>, document.getElementById('root'));
                }
        }

    }
    signup() {
        ReactDOM.render(<SignUpComponent />, document.getElementById('root'));
    }

    render() {

        return (
            <Form>
                <h3> Login</h3>
                
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
                
                <Button variant="primary" type="button" onClick={() =>{this.signup()}}>
                    SignUp
                </Button>
                <Button variant="primary" type="submit" onClick = {() => {this.toggle()}}>
                    Login
                </Button>
            </Form>
        );
    }


}
export default Login;