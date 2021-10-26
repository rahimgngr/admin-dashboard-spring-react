import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  InputGroup,
  Table,
  Button,
  FormControl,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ToastComponent from "./ToastComponent";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  // pagination set numbers
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = users.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/get")
      .then((res) => setUsers(res.data));
  }, []);

  // delete data with spesific id
  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:8080/admin/ ${userId}`).then((res) => {
      if (res.data != null) {
        setShow(true);
        setUsers(users.filter((user) => user.id !== userId));
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
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(Math.ceil(users.length / usersPerPage));
    }
  };
  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // formcontrol page number control stuff
  const changePage = (e) => {
    setCurrentPage(e.target.value <= totalPages ? e.target.value : totalPages);
  };

  const searchChange = (e) => {
    setSearch(([e.target.name] = e.target.value));

    if (search !== "") {
      const newUserList = users.filter((user) => {
        return Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchRes(newUserList);
    } else {
      setSearchRes(currentUsers);
    }
  };

  return (
    <div name="userlist" style={{ margin: "132px 50px" }}>
      <Card
        className={"border border-dark bg-dark text-white"}
        style={{ margin: "45px 0" }}
      >
        <div style={{ display: show ? "block" : "none" }}>
          <ToastComponent
            children={{
              show: show,
              message: "User Deleted!",
              type: "danger",
            }}
          />
        </div>
        <Card.Header>
          <div style={{ float: "left" }}>User List</div>
          <div style={{ float: "right" }}>
            <InputGroup size="sm">
              <FormControl
                type="search"
                placeholder="Search"
                name="search"
                className="bg-dark text-white"
                aria-label="Search"
                onChange={searchChange}
              />
            </InputGroup>
          </div>
        </Card.Header>

        <Card.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <td>Username</td>
                <td>Role</td>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr align="center">
                  <td colSpan="2">No Users Found..</td>
                </tr>
              ) : (
                (search.length < 1 ? currentUsers : searchRes).map(
                  (user, index) => (
                    <tr key={user.id || index}>
                      <td>{user.userName}</td>
                      <td>{user.role}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"/edit-user/" + user.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            edit
                          </Link>

                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => deleteUser(user.id)}
                          >
                            delete
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  )
                )
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
