import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import ToastComponent from "./ToastComponent";
// import moment from "moment";

// const calculateDaysLeft = (startDate, endDate) => {
//   if (!moment.isMoment(startDate)) startDate = moment(startDate);
//   if (!moment.isMoment(endDate)) endDate = moment(endDate);

//   return endDate.diff(startDate, "days");
// };

const getCurrentDate = (separator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
};

const values = {
  id: "",
  projectName: "",
  startDate: getCurrentDate(),
  endDate: getCurrentDate(),
};

function AddProject({ children }) {
  const [form, setForm] = useState(values);
  const [show, setShow] = useState(false);
  const [method, setMethod] = useState("");

  let history = useHistory();
  let { id } = useParams();

  /** ---------------------- controller ---------------------- */

  // Project data save
  const submitProject = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8080/project/add", JSON.stringify(form), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data != null) {
          setShow(true);
          setMethod("post");
          setTimeout(() => setShow(false), 1500);
        } else {
          setShow(false);
        }
      });
  };

  /** update */
  // Project data update
  const updateProject = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:8080/project/put/${id}`, JSON.stringify(form), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data != null) {
          setShow(true);
          setMethod("put");
          setTimeout(() => setShow(false), 1500);
          setTimeout(() => projectList(true), 1500);
        } else {
          setShow(false);
        }
      });
  };

  // find project with id to show when we want to update
  const findProjectById = async (id) => {
    await axios
      .get(`http://localhost:8080/project/get/${id}`)
      .then((res) => {
        if (res.data != null) {
          setForm({
            id: res.data.id,
            projectName: res.data.projectName,
            startDate: res.data.startDate,
            endDate: res.data.endDate,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /** update end*/

  /** ---------------------- controller end ---------------------- */

  // to add in project list
  const projectChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // to reset project values that we wrote
  const resetProject = () => {
    setForm(values);
  };

  // back to project list
  const projectList = () => {
    setTimeout(() => {
      history.push("/list-project");
    }, 1000);
  };

  // for memo
  useEffect(() => {
    findProjectById(id);
  }, [id]);

  return (
    <div>
      <div style={{ display: show ? "block" : "none" }}>
        <ToastComponent
          children={{
            show: show,
            message: method === "post" ? "Project Saved!" : "Project Updated!",
            type: "success",
          }}
        />
      </div>

      <Card
        className={"border border-dark bg-dark text-white"}
        style={{ margin: "45px 0px" }}
      >
        <Card.Header>{id ? "Update Project" : "Save Project"}</Card.Header>

        <Form
          id="projectFormId"
          onSubmit={id ? updateProject : submitProject}
          onReset={resetProject}
        >
          <Card.Body>
            <Form.Group as={Col}>
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                required
                autoComplete="off"
                type="text"
                name="projectName"
                placeholder="Enter project name"
                className={"bg-dark text-white"}
                onChange={projectChange}
                value={form.projectName}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Started Date </Form.Label>
              <br />
              <Form.Control
                required
                type="date"
                name="startDate"
                placeholder="Date of Start"
                onChange={projectChange}
                value={form.startDate}
                className={"bg-dark text-white"}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>End Date </Form.Label>
              <br />
              <Form.Control
                required
                type="date"
                name="endDate"
                placeholder="Date of end"
                onChange={projectChange}
                value={form.endDate}
                className={"bg-dark text-white"}
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button
              size="sm"
              type="submit"
              variant="success"
              style={{ margin: "2px" }}
              onClick={projectList}
            >
              {id ? "Update" : "Save"}
            </Button>
            <Button
              size="sm"
              type="reset"
              variant="info"
              style={{ margin: "2px" }}
            >
              Reset
            </Button>
            <Button
              size="sm"
              type="button"
              variant="info"
              style={{ margin: "2px" }}
              onClick={projectList}
            >
              Project List
            </Button>
          </Card.Footer>
        </Form>
      </Card>
      {children}
    </div>
  );
}

export default React.memo(AddProject);
