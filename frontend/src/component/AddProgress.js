import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import ToastComponent from "./ToastComponent";
import { useHistory } from "react-router";

// get current date
const getCurrentDate = (separator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
};

// initalize values
const values = {
  id: "",
  userName: "rahimgng",
  projectName: " yeni proje1",
  startedTime: getCurrentDate(),
  totalTime: "",
};

function ProgressComponent() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(values);
  const [show, setShow] = useState(false);
  const [method, setMethod] = useState("");
  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8080/project/get/")
      .then((res) => setProjects(res.data.content));
    axios
      .get("http://localhost:8080/admin/get/")
      .then((res) => setUsers(res.data));
  }, []);

  const projectChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitProgress = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8080/progress/add", JSON.stringify(form), {
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

  const retProgInfo = () => {
    setTimeout(() => {
      history.push("/list-progress");
    }, 1500);
  };

  return (
    <div name="addprog" style={{ margin: "132px 50px" }}>
      <div style={{ display: show ? "block" : "none" }}>
        <ToastComponent
          children={{
            show: show,
            message:
              method === "post" ? "Progress Saved!" : "Progress Updated!",
            type: "success",
          }}
        />
      </div>
      <Card
        className={"border border-dark bg-dark text-white"}
        style={{ margin: "45px 0px" }}
      >
        <Card.Header>{"Save Progress"}</Card.Header>

        <Form id="progressFormId" onSubmit={submitProgress}>
          <Card.Body>
            <Form.Group as={Col} controlId="dateId">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                name="startedTime"
                min={values.startedTime}
                placeholder="Date of Start"
                onChange={projectChange}
                value={form.startedTime}
                className={"bg-dark text-white"}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Select Project</Form.Label>
              <Form.Select
                className={"bg-dark text-white"}
                aria-label="select project"
                name="projectName"
                value={form.projectName}
                onChange={projectChange}
              >
                {projects.map((project, index) => (
                  <option key={project.id || index} id={project.id}>
                    {project.projectName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Select User</Form.Label>
              <Form.Select
                className={"bg-dark text-white"}
                aria-label="select user"
                value={form.userName}
                name="userName"
                onChange={projectChange}
              >
                {users.map((user, index) => (
                  <option key={user.id || index}>{user.userName}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Card.Body>

          <Card.Footer style={{ textAlign: "right" }}>
            <Button
              size="sm"
              type="submit"
              variant="success"
              style={{ margin: "2px" }}
              onClick={retProgInfo}
            >
              Save
            </Button>

            <Button
              size="sm"
              type="button"
              variant="info"
              style={{ margin: "2px" }}
              onClick={retProgInfo}
            >
              Progress Info
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

export default ProgressComponent;
