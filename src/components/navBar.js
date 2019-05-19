import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import trinLogo from '../assets/img/trainLogo.png';


export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        
        this.state = {
            isOpen: false,
            isAuthenticated: false
        };
        let email = localStorage.getItem('email');
        if (email != '') {
            this.state.isAuthenticated = true;
        }
    }
    logout = () => {
        this.setState({
            isAuthenticated: false
        })
        localStorage.setItem('email','');
        localStorage.setItem('mobile','');
        this.props.history.push(`/`);
    }
   

    componentDidUpdate() {

        this.state = {
            isOpen: false,
            isAuthenticated: false
        };
        let email = localStorage.getItem('email');
        if (email != '') {
            this.state.isAuthenticated = true;
        }
        else{
            this.state.isAuthenticated = false;
        }
        
    }


    render() {
       this.componentDidUpdate();
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <img
                        alt=""
                        src={trinLogo}
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                    />
                    <NavbarBrand href="/" ><b><h1>E-Train Book</h1></b></NavbarBrand>
                    
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.state.isAuthenticated ?
                               <div>
                                <NavItem>
                                    <NavLink onClick={this.logout}><b>Log out</b>  <i class="fas fa-sign-out-alt"></i>

</NavLink>
                                </NavItem>
                                </div>
                             :
                                <div>
                                    <Nav className="ml-auto" navbar>
                                    <NavItem className="ml-auto">
                                        <NavLink href="/signup/"><b>Sign up</b>  <i class="fas fa-user-plus"></i>

                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/login/"><b>Sign In</b><i class="fas fa-sign-in-alt"></i>

                                     </NavLink>
                                    </NavItem></Nav>
                                </div>

                            }

                        </Nav>
                    </Collapse>
                </Navbar>
                
            </div>
        );
    }
}