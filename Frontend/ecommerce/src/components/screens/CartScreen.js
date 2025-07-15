import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { useCart } from '../CartContext'; // Adjust path as per your project structure
import './CartScreen.css';

function CartScreen() {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemQuantities, setItemQuantities] = useState({});

  // Initialize item quantities from cartItems on component mount
  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach(item => {
      initialQuantities[item._id] = item.quantity;
    });
    setItemQuantities(initialQuantities);
  }, [cartItems]);

  // Calculate subtotal for each item
  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  // Calculate total price of all items in the cart
  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += calculateSubtotal(item.price, itemQuantities[item._id]);
    });
    setTotalPrice(total);
  }, [cartItems, itemQuantities]);

  // Handle increment quantity for an item
  const handleIncrement = (productId) => {
    const newQuantity = itemQuantities[productId] + 1;
    updateCartItemQuantity(productId, newQuantity); // Update global state
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  // Handle decrement quantity for an item
  const handleDecrement = (productId) => {
    if (itemQuantities[productId] > 1) {
      const newQuantity = itemQuantities[productId] - 1;
      updateCartItemQuantity(productId, newQuantity); // Update global state
      setItemQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));
    }
  };

  // Handle remove item from cart
  const handleRemove = (productId) => {
    removeFromCart(productId);
    // Remove quantity state for the removed item
    const { [productId]: removedItem, ...remainingQuantities } = itemQuantities;
    setItemQuantities(remainingQuantities);
  };

  // Handle clear cart
  const handleClearCart = () => {
    clearCart();
    setItemQuantities({});
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={8}>
          <h2>Cart</h2>
          <ListGroup variant='flush'>
            {cartItems.length === 0 ? (
              <ListGroup.Item>
                Your cart is empty
              </ListGroup.Item>
            ) : (
              cartItems.map(item => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <img src={item.image} alt={item.productname} className='img-fluid' />
                    </Col>
                    <Col md={5}>
                      <div>
                        <Link to={`/product/${item._id}`}>{item.productname}</Link>
                      </div>
                      <div>Rs. {item.price}</div>
                      <div className="d-flex align-items-center">
                        <Button
                          variant='light'
                          onClick={() => handleDecrement(item._id)}
                          disabled={itemQuantities[item._id] === 1} // Disable if quantity is 1
                          className="quantity-btn"
                        >
                          -
                        </Button>
                        <input
                          type='number'
                          className='form-control quantity-input'
                          value={itemQuantities[item._id]}
                          readOnly
                        />
                        <Button
                          variant='light'
                          onClick={() => handleIncrement(item._id)}
                          className="quantity-btn"
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="subtotal">
                        Subtotal: Rs. {calculateSubtotal(item.price, itemQuantities[item._id])}
                      </div>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => handleRemove(item._id)}
                        className='remove-btn mt-2'
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
          {cartItems.length > 0 && (
            <Button
              className='btn-block mt-3'
              variant='danger'
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          )}
        </Col>
        <Col md={4} className="total-section">
          <div className="total-price">
            Total Amount: Rs. {totalPrice}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CartScreen;
