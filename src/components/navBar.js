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

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div >
                <Navbar color="light" light expand="md">
                    <img
                        alt=""
                        src={trinLogo}
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                    />
                    <NavbarBrand href="/" ><b><h1>E-Train Book</h1></b></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/signup/">Sign up</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login/">Sign In</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}