import React from 'react';
import { Container } from 'react-bootstrap';

const Blog = () => {
    return (
        <Container className="mt-5">
            <h1>Our Blog</h1>
            <p>Explore our latest articles and posts on nutrition, health tips, recipes, and more. Stay informed and inspired on your journey to better health!</p>
            <div className="blog-list">
                <div className="blog-post">
                    <h3>Benefits of Eating Organic Foods</h3>
                    <p>Learn about the advantages of incorporating organic foods into your diet and how they can benefit your overall health.</p>
                    <a href="/blog/benefits-of-eating-organic-foods">Read More</a>
                </div>
                <div className="blog-post">
                    <h3>Healthy Smoothie Recipes for Breakfast</h3>
                    <p>Discover delicious and nutritious smoothie recipes that are perfect for starting your day on a healthy note.</p>
                    <a href="/blog/healthy-smoothie-recipes">Read More</a>
                </div>
                {/* Add more blog posts as needed */}
            </div>
        </Container>
    );
};

export default Blog;
