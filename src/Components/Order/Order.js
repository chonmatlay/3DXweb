import React , {Component}  from 'react';
import {Container} from 'reactstrap';

export default class Order extends Component {

    render() {
        return (
            <Container>
                 <Container className="searchContainer">
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Input type="search" id="search" placeholder="Search"/>
                        </Col>
                            
                        <Col></Col>
                    </Row>
                </Container>

            </Container>
        )
    }
}