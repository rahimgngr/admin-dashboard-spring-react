import "./App.css";
import NavigationBar from "./component/NavigationBar";
import WelcomeComponent from "./component/WelcomeComponent";
import FooterComponent from "./component/FooterComponent";
import ProjectList from "./component/ProjectList";
import AddProject from "./component/AddProject";
import UserList from "./component/UserList";
import AddUser from "./component/AddUser";
import AddProgress from "./component/AddProgress";
import ProgressList from "./component/ProgressList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <div name="content" style={{ display: "grid" }}>
          <Switch>
            <Route
              path="/login"
              component={() => {
                window.location.href = "http://localhost:8080/login";
                return null;
              }}
            />
            <Route path="/add-project" component={AddProject} />
            <Route path="/edit-project/:id" component={AddProject} />
            <Route path="/list-project" component={ProjectList} />

            <Route path="/add-user" component={AddUser} />
            <Route path="/edit-user/:id" component={AddUser} />
            <Route path="/list-users" component={UserList} />

            <Route path="/progress" component={AddProgress} />
            <Route path="/list-progress" component={ProgressList} />

            <Route path="/" component={WelcomeComponent} />
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
