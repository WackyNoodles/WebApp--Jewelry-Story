import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import Product from "../Product";
import './HomeScreen.css'; // Ensure you have a corresponding CSS file
import titleImage from './title.jpeg'; // Adjust the path as necessary

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("/api/products/");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const price = Number(product.price);  // Ensure price is treated as a number
    const min = Number(minPrice);  // Convert minPrice to a number
    const max = Number(maxPrice);  // Convert maxPrice to a number
    const priceCondition = price >= min && price <= max;
    if (category === 'All') return priceCondition;
    return product.productcategory === category && priceCondition;
  });

  return (
    <div>
      {/* Image Section */}
      <div className="image-section">
        <img src={titleImage} alt="Grace Brand" className="title-image" />
      </div>

      {/* Product Section */}
      <div className="product-section">
        <Container>
          <br />
          <h2 className="text-center">Our Products</h2>
          <br />
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="categorySelect">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Male Rings">Men Rings</option>
                    <option value="Female Rings">Women Rings</option>
                    <option value="Kids">Kids Rings</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="minPrice">
                  <Form.Label>Min Price</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={minPrice} 
                    onChange={(e) => setMinPrice(Number(e.target.value))}  // Convert to number on change
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="maxPrice">
                  <Form.Label>Max Price</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(Number(e.target.value))}  // Convert to number on change
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="product-item">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HomeScreen;
