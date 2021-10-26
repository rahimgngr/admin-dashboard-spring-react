import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

function WelcomeComponent() {
  return (
    <div name="welcomeComp" style={{ margin: "100px" }}>
      <Carousel fade>
        <Carousel.Item>
          <Link to="/list-users">
            {" "}
            <img
              className="d-block w-100"
              src="https://www.elegantthemes.com/blog/wp-content/uploads/2021/04/add-new-user-wordpress.jpg"
              alt="Users"
              width="500"
              height="500"
            />
          </Link>

          <Carousel.Caption>
            <h3>Users</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Link to="/list-project">
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvamVjdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
              alt="Projects"
              width="500"
              height="500"
            />
          </Link>
          <Carousel.Caption>
            <h3>Projects</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Link to="/list-progress">
            <img
              className="d-block w-100"
              src="https://www.commaconsulting.com.au/imager/s3-ap-southeast-2_amazonaws_com/commaconsulting-articles/progress_ad673a4d54c08bc9c921b5784f2d8a33.jpg"
              alt="Progress"
              width="500"
              height="500"
            />
          </Link>
          <Carousel.Caption>
            <h3>Progress</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default WelcomeComponent;
