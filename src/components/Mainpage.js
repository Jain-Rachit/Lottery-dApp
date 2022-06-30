import React from 'react'
import {Row,Col,Card,ListGroup,Container,Button} from 'react-bootstrap'
function Mainpage({enterlottery,drawlottery,claimprize,lotteryprice,totalprice,lotteryhistory,lotteryplayers}) {
  return (
    <Container fluid>
        <Row xs={1} md={2} lg={2} className="g-4 mt-1">
            
            <Col>
                <Card>        
                    <Card.Body>
                    <Card.Title>Play Lottery</Card.Title>
                    <Card.Text>
                        Enter the Lottery by sending {lotteryprice} Wei                     
                    </Card.Text>
                        <Button variant="outline-primary" onClick={enterlottery}>Play Now</Button>
                    </Card.Body>
                </Card>
            </Col>
            
            <Col>
                <Card>        
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
            </Col>    
            
        </Row>
{/*----------------------------------------------------------------------------         */}
        <Row xs={1} md={2} lg={2} className="g-4 mt-1"> 
            
            <Col>
                <Card>        
                    <Card.Body>
                    <Card.Title>Pick winner</Card.Title>
                    <Card.Text>
                        Can only be done by Admin
                    </Card.Text>
                        <Button variant="outline-primary" onClick={drawlottery}>Draw Lottery</Button>
                    </Card.Body>
                </Card>
            </Col>
            
            <Col>
                <Card>        
                    <Card.Body>
                    <Card.Title>Players</Card.Title>
                    <Card.Text>
                        <ListGroup variant="flush">
                        {
                            (lotteryplayers && lotteryplayers.length > 0) && lotteryplayers.map((player,index) =>{
                                return(
                                        <ListGroup.Item key={index} >
                                        <a href={`https://rinkeby.etherscan.io/address/${player}`}>
                                            {player}
                                        </a>
                                        </ListGroup.Item>                        
                                )
                            })
                        }
                        </ListGroup>
                    </Card.Text>
                    </Card.Body>
                </Card>
            </Col>    
            
        </Row>
{/* ------------------------------------------------------------------------------------         */}
        <Row xs={1} md={2} lg={2} className="g-4 mt-1">
            
            <Col>
                <Card>        
                    <Card.Body>
                    <Card.Title>Claim Prize</Card.Title>
                    <Card.Text>
                        Winner can claim for the Lottery prize
                    </Card.Text>
                        <Button variant="outline-primary" onClick={claimprize}>Claim</Button>
                    </Card.Body>
                </Card>
            </Col>
            
            <Col>
                <Card>        
                    <Card.Body>
                    <Card.Title>Prize Money</Card.Title>
                    <Card.Text>
                        {totalprice}
                    </Card.Text>
                    </Card.Body>
                </Card>
            </Col>    
            
        </Row>
    </Container>  
  )
}

export default Mainpage