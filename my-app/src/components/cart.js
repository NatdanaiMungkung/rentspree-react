import React from 'react';
import { Col, Row, Button } from 'react-bootstrap'
import NumberFormat from 'react-number-format';

const Cart = ({ products, handleChangeQuantity, handleRemove, getTotalPrice, isAllowAction, onCheckOut }) => {

  const renderCart = () => (
    products.map(product => {
      if (product.quantity > 0) {
        return <Row style={{ paddingBottom: '2%' }}>
          <Col>
            <div><img className="cart-image" src={product.imageUrl} alt={product.name} />{product.name}</div>

          </Col>
          <Col><div><NumberFormat value={product.price} thousandSeparator displayType='text' /></div></Col>
          <Col><div>
            <Button variant="outline-secondary" onClick={() => handleChangeQuantity(-1, product.id)}>-</Button><NumberFormat value={product.quantity} thousandSeparator displayType='text' />
            <Button variant="outline-secondary" onClick={() => handleChangeQuantity(1, product.id)}>+</Button>
          </div></Col>
          <Col><div><NumberFormat value={product.quantity * product.price} thousandSeparator displayType='text' /></div></Col>
          {isAllowAction && (
            <Col><div><Button onClick={() => handleRemove(product.id)}>Remove</Button></div></Col>
          )}
        </Row>
      }
    }));

  return (
    <>
      <Row>
        <Col>Product</Col>
        <Col>Price per unit</Col>
        <Col>Unit(s)</Col>
        <Col>Total Price</Col>
        {isAllowAction && (<Col>Action</Col>)}
      </Row>
      <div className="line"></div>
      {renderCart()}
      <div className="line"></div>
      <div className="right">Total <NumberFormat value={getTotalPrice()} thousandSeparator displayType='text' /></div>
      <div className="right">Tax (7%) <NumberFormat value={Math.round((getTotalPrice() * 0.07 + Number.EPSILON) * 100) / 100} thousandSeparator displayType='text' /></div>
      <div className="right">Gross Price <NumberFormat value={getTotalPrice() + (getTotalPrice() * 0.07)} thousandSeparator displayType='text' /></div>
      {isAllowAction && (<div className="right"><Button onClick={onCheckOut}>Check Out</Button></div>)}
    </>
  )
}

export default Cart;