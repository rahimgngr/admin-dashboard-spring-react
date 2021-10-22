import React from "react";
import { Navbar, Container, Col } from "react-bootstrap";

function FooterComponent() {
  return (
    <div>
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Container>
          <Col className="text-center text-muted">
            <div>Dashboard Admin Page</div>
          </Col>
        </Container>
      </Navbar>
    </div>
  );
}

export default FooterComponent;
