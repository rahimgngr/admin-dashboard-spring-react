/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import {
  InputGroup,
  ButtonGroup,
  Card,
  Table,
  Button,
  FormControl,
  ProgressBar,
} from "react-bootstrap";
import axios from "axios";
import ToastComponent from "./ToastComponent";
import { Link } from "react-router-dom";
import moment from "moment";

import "bootstrap/dist/css/bootstrap.min.css";

const calculateDaysLeft = (startDate, endDate) => {
  if (!moment.isMoment(startDate)) startDate = moment(startDate);
  if (!moment.isMoment(endDate)) endDate = moment(endDate);

  return endDate.diff(startDate, "days");
};

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState([]);
  const [totalElements, setTotalElements] = useState([]);
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  // for get data
  const getProject = async (currentpage) => {
    currentpage -= 1;
    await axios(
      `http://localhost:8080/project/get?page=${currentpage}&size=${projectsPerPage}`
    ).then(
      (res) => (
        setProjects(res.data.content),
        setTotalPages(res.data.totalPages),
        setTotalElements(res.data.totalElements),
        setCurrentPage(res.data.number + 1)
      )
    );
  };

  // initalize get request
  useEffect(() => {
    getProject(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
      getProject(1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      getProject(currentPage - 1);
    }
  };
  const lastPage = () => {
    if (currentPage < Math.ceil(totalElements / projectsPerPage)) {
      getProject(Math.ceil(totalElements / projectsPerPage));
    }
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(totalElements / projectsPerPage)) {
      getProject(currentPage + 1);
    }
  };

  // formcontrol page number control stuff
  const changePage = (e) => {
    setCurrentPage(e.target.value <= totalPages ? e.target.value : totalPages);
  };

  // get typed character
  const searchChange = (e) => {
    setSearch(e.target.value);

    if (search !== "") {
      const newProjectList = projects.filter((project) => {
        return Object.values(project)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchRes(newProjectList);
    } else {
      setSearchRes(projects);
    }
  };

  return (
    <div name="project" style={{ margin: "132px 50px" }}>
      <div style={{ display: show ? "block" : "none" }}>
        <ToastComponent
          children={{ show: show, message: "Project Deleted!", type: "danger" }}
        />
      </div>

      <Card
        className={"border border-dark bg-dark text-white"}
        style={{ margin: "45px 0" }}
      >
        <Card.Header>
          <div style={{ float: "left" }}>Project List</div>
          <div style={{ float: "right" }}>
            <InputGroup size="sm">
              <FormControl
                type="search"
                placeholder="Search"
                name="search"
                aria-label="Search"
                className={"bg-dark text-white"}
                onChange={searchChange}
              />
            </InputGroup>
          </div>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th> Total Days</th>
                <th>Progress</th>
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
                (search.length < 1 ? projects : searchRes).map((project) => (
                  <tr key={project.id}>
                    <td>{project.projectName}</td>
                    <td>{project.startDate}</td>
                    <td>{project.endDate}</td>
                    <td>
                      {calculateDaysLeft(project.startDate, project.endDate)}
                    </td>
                    <td>
                      <ProgressBar
                        now={calculateDaysLeft(
                          project.startDate,
                          project.endDate
                        )}
                      />
                    </td>
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
