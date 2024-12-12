import React from "react";
import { Button, Row, Col, Card, Form } from "react-bootstrap";

const HomePage = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}>
          <h2 className="display-4 text-primary">Welcome to Bhoomi</h2>
          <p className="lead text-muted">
            Your trusted property management partner. Discover your dream
            property today.
          </p>
          <Button variant="primary" size="lg">
            Explore Properties
          </Button>
        </Col>
      </Row>

      {/* Search Section */}
      <Row className="justify-content-center mb-5">
        <Col md={10} lg={8}>
          <h3 className="text-center text-secondary mb-4">
            Find Your Perfect Property
          </h3>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group controlId="propertyType">
                  <Form.Label>Property Type</Form.Label>
                  <Form.Control as="select">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" placeholder="Enter location" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="priceRange">
                  <Form.Label>Price Range</Form.Label>
                  <Form.Control as="select">
                    <option>Under ₹50 Lakh</option>
                    <option>₹50 Lakh - ₹1 Crore</option>
                    <option>Over ₹1 Crore</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="outline-primary" className="mt-3 w-100">
              Search Properties
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Recently added Section */}
      <Row className="mb-5">
        <Col>
          <h3 className="text-center text-secondary mb-4">Recently Added</h3>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/350x200" />
            <Card.Body>
              <Card.Title>Luxury Apartment in Downtown</Card.Title>
              <Card.Text>
                A beautiful 3-bedroom apartment with amazing city views. Perfect
                for a family.
              </Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
            <Card.Footer className="text-muted">₹1,20,00,000</Card.Footer>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/350x200" />
            <Card.Body>
              <Card.Title>Spacious Family Home</Card.Title>
              <Card.Text>
                A cozy 4-bedroom house located in a peaceful neighborhood with
                great amenities.
              </Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
            <Card.Footer className="text-muted">₹8,50,00,000</Card.Footer>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/350x200" />
            <Card.Body>
              <Card.Title>Modern Office Space</Card.Title>
              <Card.Text>
                A prime commercial property in the heart of the business
                district. Ideal for startups.
              </Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
            <Card.Footer className="text-muted">₹10,00,500/month</Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* About Us Section */}
      <Row className="justify-content-center mb-5">
        <Col md={10}>
          <h3 className="text-center text-secondary mb-4">About Bhoomi</h3>
          <p className="text-center">
            Bhoomi is a leading real estate platform that connects buyers,
            sellers, and renters to their ideal properties. Our team is
            dedicated to providing personalized and expert guidance throughout
            the real estate journey. Whether you're looking to buy, sell, or
            rent, we are your trusted partner every step of the way.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
