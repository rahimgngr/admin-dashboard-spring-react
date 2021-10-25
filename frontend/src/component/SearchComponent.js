// import React, { useState, useEffect } from "react";
// import { Form, FormControl, Button } from "react-bootstrap";
// import axios from "axios";
// function SearchComponent() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [projects, setProjects] = useState([]);
//   const [users, setUsers] = useState([]);

//   // for get data
//   const getProject = async () => {
//     await axios("http://localhost:8080/project/get").then((res) =>
//       setProjects(res.data)
//     );
//   };
//   useEffect(() => {
//     getProject();
//   }, [projects]);

//   return (
//     <div>
//       <Form className="d-flex">
//         <FormControl
//           type="search"
//           placeholder="Search"
//           className="me-2"
//           aria-label="Search"
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//           }}
//         />
//         {projects
//           .filter((project) => {
//             if (searchTerm === "") {
//               return project;
//             } else if (
//               project.projectName
//                 .toLowerCase()
//                 .includes(searchTerm.toLowerCase())
//             ) {
//               return project;
//             }
//           })
//           .map((pro, index) => {
//             return <div key={pro.id || index}></div>;
//           })}
//         {/* <Button variant="outline-success">Search</Button> */}
//       </Form>
//     </div>
//   );
// }

// export default SearchComponent;
