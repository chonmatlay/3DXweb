import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import "./Signin.css";
import { Auth } from "aws-amplify";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    try {
      await Auth.signIn(this.state.email, this.state.password);
      alert("Signed in");
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    return (
      <div className="Login">
        <h4>Sign in to 3DGenerationX</h4>
        <Form onSubmit={this.handleSubmit} className="Feild">
        <FormGroup>
          <Label className="Label">Email</Label>
          <Input
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
            />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            id="password"  
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormGroup>
          <Button
            color="success"
            block

            disabled={!this.validateForm()}
            type="submit"
          >
            Sign in
          </Button>
        </Form>
      </div>
    );
  }
}