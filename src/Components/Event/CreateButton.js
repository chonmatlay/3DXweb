
import React , {Component} from 'react';
import {Button , Modal , ModalHeader , ModalBody , ModalFooter , Form, FormGroup, Label, Input, FormText ,CustomInput} from 'reactstrap';
import Axios from 'axios';
import CheckBox from './CheckBox';
const qs = require('qs');
function newProductList(name , uuid){
    this.name = name ;
    this.uuid =uuid;
    this.check =false ;
}

export default class CreateButt extends Component {
    constructor (props){ 
        super(props);
        this.state = {
            modal : false,
            name : "",
            product :[],
            startDate :"",
            endDate : "",
            eventLink:"",
            cost0 : 0,
            cost1 :0,
            imgEventLink :"",
            productList :[]
        };
        this.toggle = this.toggle.bind(this);
         this.createEvent = this.createEvent.bind(this);
         this.handleChange =this.handleChange.bind(this);
         this.toggleCheck= this.toggleCheck.bind(this);
         
    }
    toggle() {
        this.setState(prevState => (
            {
                modal : !prevState.modal
            }
        ))
    }
    async componentDidMount(){
        await Axios.get('https://zef4dspqvf.execute-api.ap-southeast-1.amazonaws.com/dev/admin/product/getall')
        .then(res => {
            
            let  productList = res.data.data 
            let newList=  productList.map(product => new newProductList(product.name,product.uuid))
            this.setState({
                productList : newList ,
                product : newList
            })
        })
        .catch(e => console.log(e));
    }

     async createEvent  ()  {
         try {
            let toggle= await this.toggle;
            let getData =await this.props.getData;
        let check =await [];
        let product=[]
        product = product.concat(this.state.product);
        let insertCheck=()=>{ for (let i=0 ; i< product.length ;i++){
            if (product[i].check) check.push(product[i].name)
            
        }}
        await insertCheck();
        let myStartDay = await new Date(this.state.startDate)
        let myEndDay = await new Date(this.state.endDate)
        let  options = await {
            name: this.state.name,
            startAt: myStartDay.getTime(),
            endAt: myEndDay.getTime(),
            imgEventLink: this.state.imgEventLink,
            productListID: check,
            status: true,
            priceType0: this.state.cost0,
            priceType1: this.state.cost1,
            eventLink: this.state.eventLink
        }
            await Axios.post('https://zef4dspqvf.execute-api.ap-southeast-1.amazonaws.com/dev/admin/event/create',qs.stringify(options,{arrayFormat : 'repeat'}),{
        headers:{    
            'Content-Type': 'application/x-www-form-urlencoded'
        }   
    }).then(res=> console.log(res.data.status))      
        await getData();
        setTimeout(toggle(),300);
    }
    catch(e){console.log(e)}
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
     toggleCheck (uuid){
            console.log('click')
            let product= this.state.product.slice()
            let flag =this.state.product.find((value, index, array)=> value.uuid== uuid)
           let index = product.indexOf(flag) 
           flag.check = !flag.check
          product[index]= flag ;
           
           console.log(flag)
           this.setState({
                product 
            })

    }
    render(){
        const setState =this.setState.bind(this)
        const toggleCheck= this.toggleCheck.bind(this);
        const productList = this.state.productList
        const checkbox =productList.map(product =>{
            let uuid = product.uuid
            return <CustomInput type="checkbox" id={product.uuid} key={product.uuid} name={product.name}  label={product.name} onClick={()=>toggleCheck(uuid)}/>

            })
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
                        <Label> Gia loai 1 </Label>
                        <Input 
                            type= "number"
                            name = "cost0"
                            id = "cost0"
                            onChange = {this.handleChange}
                            value = {this.state.cost0}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label> Gia loai 2 </Label>
                        <Input 
                            type= "number"
                            name = "cost1"
                            id = "cost1"
                            onChange = {this.handleChange}
                            value = {this.state.cost1}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Link su kien</Label>
                        <Input 
                            type = "text"
                            name = "eventLink"
                            id = "eventLink"
                            onChange = {this.handleChange}
                            value ={this.state.eventLink}
                        /> 
                    </FormGroup>
                    <FormGroup >
                            {checkbox}
                    </FormGroup>
                    <FormGroup>
                        <Label>Link anh</Label>
                        <Input type ="text"
                                name="eventImgLink"
                                id = "imgEventLink"
                                onChange ={this.handleChange}
                                value ={this.state.imgEventLink}
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