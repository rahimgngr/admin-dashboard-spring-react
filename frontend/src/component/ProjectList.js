import React, { useEffect, useState } from "react";
import {
  InputGroup,
  ButtonGroup,
  Card,
  Table,
  Button,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import ToastComponent from "./ToastComponent";
import { Link } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);

  const lastIndex = currentPage * projectsPerPage;
  const firstIndex = lastIndex - projectsPerPage;
  const currentProjects = projects.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // for get data
  const getProject = async () => {
    await axios("http://localhost:8080/project/get").then((res) =>
      setProjects(res.data)
    );
  };
  useEffect(() => {
    getProject();
  }, [projects]);

  // delete data with spesific id
  const deleteProject = async (projectId) => {
    await axios
      .delete(`http://localhost:8080/project/ ${projectId}`)
      .then((res) => {
        if (res.data != null) {
          setShow(true);
          setTimeout(() => setShow(false), 1500);
        } else {
          setShow(false);
        }
      });
  };

  // Button pagination stuff
  const firstPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const lastPage = () => {
    if (currentPage < Math.ceil(projects.length / projectsPerPage)) {
      setCurrentPage(Math.ceil(projects.length / projectsPerPage));
    }
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(projects.length / projectsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // formcontrol page number control stuff
  const changePage = (e) => {
    setCurrentPage(e.target.value <= totalPages ? e.target.value : totalPages);
  };

  return (
    <div style={{ heigth: "100px" }}>
      <div style={{ display: show ? "block" : "none" }}>
        <ToastComponent
          children={{ show: show, message: "Project Deleted!", type: "danger" }}
        />
      </div>

      <Card
        className={"border border-dark bg-dark text-white"}
        style={{ margin: "45px 0" }}
      >
        <Card.Header>Project List</Card.Header>
        <Card.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Project Name</th>

                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
              <tr></tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr align="center">
                  <td colSpan="5">No Projects Available..</td>
                </tr>
              ) : (
                currentProjects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.projectName}</td>
                    <td>{project.startDate}</td>
                    <td>{project.endDate}</td>
                    <td>
                      <ButtonGroup>
                        <Link
                          to={"/edit-project/" + project.id}
                          className="btn btn-sm btn-outline-primary"
                        >
                          edit
                        </Link>

                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => deleteProject(project.id)}
                        >
                          delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <div style={{ float: "left" }}>
            {" "}
            {currentPage} of {totalPages}
          </div>
          <div style={{ float: "right" }}>
            <InputGroup size="sm">
              <Button
                type="button"
                variant="outline-info"
                disabled={currentPage === 1 ? true : false}
                onClick={firstPage}
              >
                First
              </Button>
              <Button
                type="button"
                variant="outline-info"
                disabled={currentPage === 1 ? true : false}
                onClick={prevPage}
              >
                Prev
              </Button>

              <FormControl
                style={{
                  textAlign: "center",
                  width: "40px",
                  color: "white",
                }}
                className={"bg-dark"}
                name="currentPage"
                defaultValue={currentPage}
                onChange={changePage}
              />

              <Button
                type="button"
                variant="outline-info"
                disabled={currentPage === totalPages ? true : false}
                onClick={nextPage}
              >
                Next
              </Button>
              <Button
                type="button"
                variant="outline-info"
                disabled={currentPage === totalPages ? true : false}
                onClick={lastPage}
              >
                Last
              </Button>
            </InputGroup>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default React.memo(ProjectList);
