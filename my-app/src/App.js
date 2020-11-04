import { Container, Row, Col, Button, Tabs, Tab, Form, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart, FaShoppingBag, FaReact, FaNodeJs } from 'react-icons/fa';
import './App.css';
import { useState, useEffect } from 'react';
import { getList, postOrder } from './services/services'
import Products from './components/products';
import Cart from './components/cart';
import Complete from './components/complete';


function App() {
  const [key, setKey] = useState('shopping');
  const [isCompleted, setIsCompleted] = useState(false);
  const [data, setData] = useState({});
  const [validated, setValidated] = useState(false);
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

  const getTotalInCart = () => {
    let total = 0;
    products.forEach(product => {
      total = total + product.quantity;
    });
    return total;
  }

  const getTotalPrice = () => {
    let totalP = 0;
    products.forEach(product => {
      totalP += (product.quantity * product.price);
    });
    return totalP;
  }

  const handleChangeQuantity = (num, id) => {
    const product = products.filter(prod => prod.id === id)[0];
    if (product.quantity) {
      product.quantity += num;
    } else {
      product.quantity = num > 0 ? num : 0;
    }
    setProducts([...products]);
  }

  const handleRemove = (id) => {
    const product = products.filter(prod => prod.id === id)[0];
    product.quantity = 0;
    setProducts([...products]);
  }

  const isCartEmpty = () => products.some(product => product.quantity > 0);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {

      event.stopPropagation();

    } else {
      data.products = products.filter(product => product.quantity > 0);
      postOrder(data)
      setIsCompleted(true);
      setKey('complete');
      products.forEach(product => {
        product.quantity = 0;
      });
    }

    setValidated(true);
  };

  const handleComplete = () => {
    setKey('shopping')
    setIsCompleted(false);
  }

  const handleChange = (event, field) => {
    const value = event.target.value;
    switch (field) {
      case 'fname':
        data.firstname = value;
        break;
      case 'lname':
        data.lastname = value;
        break;
      case 'address':
        data.address = value;
        break;
      case 'email':
        data.email = value;
        break;
      default:
        break;
    }
    setData({ ...data });
  }

  const renderForm = () => (
    <>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            onChange={(e) => handleChange(e, 'fname')}
            defaultValue={data.firstname}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            onChange={(e) => handleChange(e, 'lname')}
            defaultValue={data.lastname}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomEmail">
          <Form.Label>Email</Form.Label>
          <InputGroup>
            <Form.Control
              type="email"
              placeholder="email"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e) => handleChange(e, 'email')}
              defaultValue={data.email}
            />
            <Form.Control.Feedback type="invalid">
              Please input valid email address
</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="validationCustom03">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Address" required onChange={(e) => handleChange(e, 'address')}
            defaultValue={data.address} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid address.
</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    </>)


  return (
    <>
      <Container>
        <Row>
          <Col className="header">
            <div className="logo"><FaShoppingBag color="red" size="3em" /> Shopoo</div>
            <div><Button onClick={() => setKey("cart")} size="lg" disabled={!isCartEmpty()}><FaShoppingCart size="1em" /> {getTotalInCart()} </Button></div>
          </Col>
        </Row>
        <Tabs activeKey={key}
          onSelect={(k) => setKey(k)}>
          <Tab eventKey="shopping" title="Shopping">
            <Row>
              {products.length > 0 && (
                <Products products={products} handleChangeQuantity={handleChangeQuantity} />
              )}

            </Row>
          </Tab>
          <Tab eventKey="cart" title="Cart" disabled={!isCartEmpty()}>
            {products.length > 0 && (
              <Cart products={products} handleChangeQuantity={handleChangeQuantity}
                handleRemove={handleRemove} getTotalPrice={getTotalPrice} isAllowAction
                onCheckOut={() => setKey('checkout')}
              />
            )}

          </Tab>
          <Tab eventKey="checkout" title="CheckOut" disabled={!isCartEmpty()}>
            <div>Shipping Address</div>
            <div className="line"></div>
            <div>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {renderForm()}
                {products.length > 0 && (
                  <Cart products={products} handleChangeQuantity={handleChangeQuantity} handleRemove={handleRemove} getTotalPrice={getTotalPrice} />
                )}
                <div className="right section" style={{ paddingTop: '2%' }}><Button type="submit">Confirm Order</Button></div>
              </Form>
            </div>
          </Tab>
          <Tab eventKey="complete" title="Complete" disabled={!isCompleted}>
            <Complete handleComplete={handleComplete} />
          </Tab>
        </Tabs>
        <div className="section"></div>

      </Container>
      <div className="footer">
        <h2>Powered By</h2>
        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer"><FaReact size="3em" color="white" style={{ paddingRight: '10px' }} /></a>
        <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer"><FaNodeJs size="3em" color="white" /></a>
      </div>
    </>
  );
}

export default App;
