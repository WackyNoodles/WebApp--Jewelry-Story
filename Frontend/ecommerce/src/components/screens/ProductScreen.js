import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, Button, Container } from 'react-bootstrap';
import Rating from '../Rating';
import axios from 'axios';
import { useCart } from '../CartContext'; // Adjust path as per your project structure
import './ProductScreen.css'; // Ensure you have a corresponding CSS file

function ProductScreen() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart(); // Use addToCart from CartContext

    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data } = await axios.get(`/api/product/${id}`);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product && product._id) {
            addToCart({ ...product, quantity });

            // Check if stockcount is greater than 0 before decrementing
            if (product.stockcount > 0) {
                // Update the stock count
                setProduct({
                    ...product,
                    stockcount: product.stockcount - quantity
                });
            } else {
                console.error('Stock count is 0 or less, cannot add to cart:', product);
            }
        } else {
            console.error('Product is not valid:', product);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid className="product-image" />
                </Col>

                <Col md={6}>
                    <div>
                        <h4 className="product-details">{product.productname}</h4>
                        <div className="divider"></div>
                        <div className="product-details">Brand: {product.productbrand}</div>
                        <div className="product-details">Description: {product.productinfo}</div>
                        <div className="product-details">
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                                color={"#FF8C00"}
                            />
                        </div>
                        <div className="divider"></div>
                        <div className="product-details">
                            <Row>
                                <Col>Price:</Col>
                                <Col><strong>Rs. {product.price}</strong></Col>
                            </Row>
                        </div>
                        <div className="product-details">
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.stockcount > 0 ? "In Stock" : "Out of Stock"}
                                </Col>
                            </Row>
                        </div>
                        <div className="product-details">
                            <Row>
                                <Col>Quantity:</Col>
                                <Col className="quantity-controls">
                                    <Button variant="outline-secondary" onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}>-</Button>
                                    <span className="quantity-counter">{quantity}</span>
                                    <Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)} disabled={quantity >= product.stockcount}>+</Button>
                                </Col>
                            </Row>
                        </div>
                        <div className="product-details">
                            <Button
                                className='btn btn-lilac btn-block'
                                disabled={product.stockcount === 0}
                                onClick={handleAddToCart}
                                type='button'
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductScreen;
