import React, { useState, useEffect } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import ToastComponent from "./ToastComponent";
import { useHistory, useParams } from "react-router-dom";

const values = {
  id: "",
  userName: "",
  role: "",
  password: "",
};

function AddUser() {
  const [form, setForm] = useState(values);
  const [method, setMethod] = useState("");
  const [show, setShow] = useState(false);
  let history = useHistory();
  let { id } = useParams();

  // user data save
  const submitUser = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8080/admin/add", JSON.stringify(form), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data != null) {
          setShow(true);
          setMethod("post");
          setTimeout(() => userList(true), 1500);
          setTimeout(() => setShow(false), 1500);
        } else {
          setShow(false);
        }
      });
  };

  // user data update
  const updateUser = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:8080/admin/put/${id}`, JSON.stringify(form), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data != null) {
          setShow(true);
          setMethod("put");
          setTimeout(() => setShow(false), 1500);
          setTimeout(() => userList(true), 1500);
        } else {
          setShow(false);
        }
      });
  };

  // to add in user list
  const userChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // to reset user values that we wrote
  const resetUser = () => {
    setForm(values);
  };

  // back to user list
  const userList = () => {
    history.push("/list-users");
  };

  // find user with id to show when we want to update
  const findUserById = async (id) => {
    await axios
      .get(`http://localhost:8080/admin/get/${id}`)
      .then((res) => {
        if (res.data != null) {
          setForm({
            id: res.data.id,
            userName: res.data.userName,
            password: res.data.password,
            role: res.data.role,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // for memo
  useEffect(() => {
    findUserById(id);
  }, [id]);
  console.log(method);
  return (
    <div>
      <div style={{ display: show ? "block" : "none" }}>
        <ToastComponent
          children={{
            show: show,
            message: method === "post" ? "User Saved!" : "User Updated!",
            type: "success",
          }}
        />
      </div>

      <Card
        className={"border border-dark bg-dark text-white"}
        style={{ margin: "45px 0px" }}
      >
        <Card.Header>{id ? "Update User" : "Save User"}</Card.Header>

        <Form
          id="userFormId"
          onSubmit={id ? updateUser : submitUser}
          onReset={resetUser}
        >
          <Card.Body>
            <Form.Group as={Col} controlId="fromGridUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                autoComplete="off"
                type="text"
                name="userName"
                placeholder="Enter Username"
                className={"bg-dark text-white"}
                onChange={userChange}
                value={form.userName}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                autoComplete="off"
                type="password"
                name="password"
                placeholder="Enter pass"
                className={"bg-dark text-white"}
                onChange={userChange}
                value={form.password}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Role</Form.Label>
              <Form.Control
                required
                autoComplete="off"
                type="text"
                name="role"
                placeholder="Enter Role"
                className={"bg-dark text-white"}
                onChange={userChange}
                value={form.role}
              />
            </Form.Group>
          </Card.Body>

          {/* footer */}
          <Card.Footer style={{ textAlign: "right" }}>
            <Button
              size="sm"
              type="submit"
              variant="success"
              style={{ margin: "2px" }}
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
              onClick={userList}
            >
              User List
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

export default AddUser;
