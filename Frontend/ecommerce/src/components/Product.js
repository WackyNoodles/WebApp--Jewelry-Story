import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import './Product.css'; // Import the CSS file

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded product-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className="text-dark">
          <Card.Title as="div" className="product-title">
            <strong>{product.productname}</strong>
          </Card.Title>
        </Link>

        

        <Card.Text as="h6" className="product-price">
        Rs. {product.price} 
        </Card.Text>
        <Rating 
          value={product.rating}
          text={` ${product.rating}`}
        />
        <Card.Text as="div" className="product-rating">
          <div className="my-3">
            {product.numReviews} reviews
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;