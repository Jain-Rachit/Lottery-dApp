import React from 'react'
import {Row,Card,ListGroup,Container,Button,Form} from 'react-bootstrap'
function MainCreateLottery({createlottery,setlotteryprice,setduration,setownershare,lotteryhistory}) {
  return (
    <Container fluid>
        <Row>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Lottery Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter Lottery price" onChange={(e)=>{setlotteryprice(e.target.value)}}/>                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="number" placeholder="Set duration for lottery (in minutes)" onChange={(e)=>{setduration(e.target.value)}}/>
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Ownershare</Form.Label>
                    <Form.Control type="number" placeholder="Enter your share" onChange={(e)=>{setownershare(e.target.value)}}/>
                </Form.Group>

                <Button variant="primary" onClick={createlottery}>
                    Create Lottery
                </Button>
            </Form>
        </Row>


        <Row className="mt-1">
            <Card className='flex'>        
                <Card.Body>
                <Card.Title>Lottery History</Card.Title>
                <Card.Text>
                    <ListGroup variant="flush">
                    {
                        (lotteryhistory && lotteryhistory.length > 0) && lotteryhistory.map(item =>{
                            return(
                                    item.address!=="0x0000000000000000000000000000000000000000"?
                                    <ListGroup.Item key={item.index}>
                                        <a href={`https://rinkeby.etherscan.io/address/${item.address}`}>{item.address}</a>
                                    </ListGroup.Item>                        
                                    :""                     
                            )
                        })
                    }
                    </ListGroup>
                </Card.Text>
                </Card.Body>
            </Card>
        </Row> 
    </Container>  
  )
}

export default MainCreateLottery