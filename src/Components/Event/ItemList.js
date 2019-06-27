import React , {Component} from 'react' ;
import {Table ,Button} from 'reactstrap';

export default class ItemList extends Component {
    constructor (props) {
        super(props)
    }
    delete(){
        
    }
    render() {
        return (
            
            <tbody>
                <tr>
                            <th>{this.props.id}</th>
                            <th>{this.props.Pname}</th>
                           
                            <th>{this.props.view}</th>   
                            <th>{this.props.sold}</th>
                            <th>{this.props.start}</th>
                            <th>{this.props.end}</th>
                            <th>{this.props.status}</th>
                           <th>{this.props.children}</th>
                            
                    </tr> 
                </tbody>   
            
        )
    }
}