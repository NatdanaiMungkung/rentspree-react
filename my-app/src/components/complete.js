import React from 'react';
import { Button } from 'react-bootstrap'

const Complete = ({ handleComplete }) => (
  <div className="center">
    <div><h1>We got your order !</h1></div>
    <div><h2>We will ship soon</h2></div>
    <div><Button onClick={() => handleComplete()}>Go to Shopping</Button></div>
  </div>
)

export default Complete;