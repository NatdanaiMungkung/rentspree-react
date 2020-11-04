import React from 'react';
import { Col, Card, Button } from 'react-bootstrap'
import NumberFormat from 'react-number-format';

const Products = ({ products, handleChangeQuantity }) => {
  return products.filter(product => product.enable).map(prod => (
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
          <div className="button-list">THB <NumberFormat value={prod.price} thousandSeparator displayType='text' /></div>
          <div className="button-list">Stock: <NumberFormat value={prod.stock} thousandSeparator displayType='text' /></div>
        </Card.Body>
      </Card></Col>
  ))
}

export default Products;