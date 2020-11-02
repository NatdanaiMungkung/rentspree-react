import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart, FaCodepen } from 'react-icons/fa';
import './App.css';
import { useState, useEffect } from 'react';
import { getList } from './services/services'


function App() {
  const [pageId, setPageId] = useState(0);
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);



  useEffect(() => {
    let mounted = true;
    getList()
      .then(items => {
        if (mounted) {
          setProducts(items.data);
        }
      })
    return () => mounted = false;
  }, [])

  const handleChangeQuantity = (num, id) => {
    const product = products.filter(prod => prod.id === id)[0];
    if (product.quantity) {
      product.quantity += num;
    } else {
      product.quantity = num > 0 ? num : 0;
    }
    setProducts([...products]);
  }

  const renderProduct = () => {
    if (products.length > 0) {
      return products.map(prod => (
        <Col xs={12} md={4}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={prod.imageUrl} />
            <Card.Body>
              <Card.Title>{prod.name}</Card.Title>
              <Card.Text>
                {prod.description}
              </Card.Text>
              <div className="button-list">
                <Button variant="outline-secondary" onClick={() => handleChangeQuantity(-1, prod.id)}>-</Button>{prod.quantity}
                <Button variant="outline-secondary" onClick={() => handleChangeQuantity(1, prod.id)}>+</Button>
              </div>
              <div className="button-list">THB {prod.price}</div>
            </Card.Body>
          </Card></Col>
      ))
    }
  }


  if (pageId === 0) {
    return (
      <Container>
        <Row>
          <Col className="header">
            <div><FaCodepen size="3em" /> Shopoo</div>
            <div><Button size="lg"><FaShoppingCart size="1em" /> 0 </Button></div>
          </Col>
        </Row>
        <Row>
          {renderProduct()}
          <Col xs={12} md={4}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
      </Card.Text>
                <Button variant="primary" block>Go somewhere</Button>
              </Card.Body>
            </Card></Col>
        </Row>
      </Container>
    );
  }

}

export default App;
