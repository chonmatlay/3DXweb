//const axios = require('axios')
import React , {Component} from 'react';
import {Button , Modal , ModalHeader , ModalBody , ModalFooter , Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios';

export default class CreateButt extends Component {
    constructor (props){ 
        super(props);
        this.state = {
            modal : false,
            name : "",
            product :"",
            phoneNumber :"",
            deliveUnit : "",
            description:"",
            cost : "",
            address : "" 
        };
        this.toggle = this.toggle.bind(this);
         this.createEvent = this.createEvent.bind(this);
         this.handleChange =this.handleChange.bind(this);
    }
    toggle() {
        this.setState(prevState => (
            {
                modal : !prevState.modal
            }
        ))
    }
    createEvent = async event => {
        event.preventDefault();
        try {
            await Axios.post('')
        } catch(e){
            console.log(e.message);
        }
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
    render(){
        return (<div> 
            <Button color="secondary" onClick= {this.toggle}>{this.props.label}</Button>
            <Modal isOpen = {this.state.modal} toggle={this.toggle} className= {this.props.className}/>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Tao chien dich</ModalHeader>
          <ModalBody>
                <Form>
                    <FormGroup>
                        <Label > Ten chien dich  </Label>
                        <Input type="text" 
                                name="campaignName" 
                                id="name"
                                onChange={this.handleChange}
                                value={this.state.name}
                                />
                    </FormGroup>
                    <FormGroup>
                        <Label> San pham </Label>
                        <Input type="text"
                                name = "product"
                                id = "product"
                                onChange = {this.handleChange}
                                value={this.state.product}
                                />
                    </FormGroup>
                   <FormGroup>
                        <Label> Thoi gian bat dau </Label>  
                        <Input type="date"
                                name = "startDate"
                                id ="startDate"
                                onChange = {this.handleChange}
                                value = {this.state.startDate}
                                /> 
                    </FormGroup> 
                    <FormGroup>
                        <Label>Thoi gian ket thuc </Label>
                        <Input
                        type= "date"
                        name= "endDate"
                        id="endDate"
                        onChange = {this.handleChange}
                        value = {this.state.endDtae}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label> Gia  </Label>
                        <Input 
                            type= "number"
                            name = "cost"
                            id = "cost"
                            onChange = {this.handleChange}
                            value = {this.state.cost}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label> Mo ta</Label>
                        <Input 
                            type = "textarea"
                            name = "description"
                            id = "description"
                            onChange = {this.handleChange}
                            value ={this.state.description}
                        /> 
                    </FormGroup>
                    <FormGroup>
                        <Button onClick= {this.createEvent}>Tao su kien</Button>
                        <Button onClick = {this.toggle}>Huy</Button>
                    </FormGroup>
                </Form>
            </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
        </div>)
    }
}