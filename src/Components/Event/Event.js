import React , {Component } from 'react';
import {Table , Button , Input , Form ,FormGroup ,Col , Container ,Row} from 'reactstrap';
import CreateButt from './CreateButton';
import "./Event.css";
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';
import ItemList from './ItemList';
import axios from 'axios';
const qs = require('qs');
export default class Event extends Component {
   
    constructor (props){
        super(props);
        this.state ={
            rows :[]

        }
    }
    async getData(){
        await axios.get('https://zef4dspqvf.execute-api.ap-southeast-1.amazonaws.com/dev/admin/event/getall')
        .then(res => {
            const rows =res.data.data;
            this.setState({rows});
            console.log(rows);
        })
        
    }
     componentDidMount(){
         axios.get('https://zef4dspqvf.execute-api.ap-southeast-1.amazonaws.com/dev/admin/event/getall')
         .then(res => {
             const rows =res.data.data;
             this.setState({rows});
             console.log(rows);
         })
      };
    
    async delete(uuid){
        try {
            let myRow =await this.state.rows.slice();
            let deleted =await myRow.find ;
            await axios.post('https://zef4dspqvf.execute-api.ap-southeast-1.amazonaws.com/dev/admin/event/delete',qs.stringify({
                event_uuid : uuid
            }))
            await axios.get('https://zef4dspqvf.execute-api.ap-southeast-1.amazonaws.com/dev/admin/event/getall')
            .then(res => {
                const rows =res.data.data;
                this.setState({rows});
                console.log(rows);
            })
        }catch(e){
            console.log(e);
        } 

    }
    render() {
        
        return (
            <div>
                <Container className="searchContainer">
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Input type="search" id="search" placeholder="Search"/>
                        </Col>
                            <CreateButt label ="Tao su kien" getData={this.getData.bind(this)}/>
                        <Col></Col>
                    </Row>
                </Container>
                
                <Row>
                <Table>
                    <thead>
                       <tr>
                            <th>ID</th>
                            <th>Ten chien dich</th>   
                            <th>so luot xem</th>
                            <th>Tong so san pham da ban</th>
                            <th>Thoi gian bat dau</th>
                            <th>Thoi gian ket thuc</th>
                            <th>Tinh trang</th>
                            <th>Quan ly</th>
                        </tr> 
                    </thead>
                    
                        
                        {this.state.rows.map((row)=> 
                           <ItemList 
                                Pname = {row.name} 
                                id={row.uuid}
                                start={row.startAt}
                                end ={row.endAt}
                                status = {row.status.toString()}
                                view= {row.totalView}
                                sold ={row.totalOrder}
                                
                            >
                            <Button onClick={() => this.delete(row.uuid)}>Xoa</Button>
                            </ItemList>
                                
                        )}
                        
                    
                </Table>
                </Row>
            </div>
        )
    }
}