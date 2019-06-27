import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes/Routes";
import {Navbar,NavbarToggler,NavbarBrand } from 'reactstrap';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isAuthenticated: false
    };
  }
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
}
render() {
    const childProps = {
        isAuthenticated: this.state.isAuthenticated,
        userHasAuthenticated: this.userHasAuthenticated
    };
    return (
        <div className="App">
            <Navbar color="light" light expand="md">
            <NavbarBrand href="/">3DGenerationX</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            </Navbar>
            <Routes childProps={childProps} />
        </div>
    );
  }
}