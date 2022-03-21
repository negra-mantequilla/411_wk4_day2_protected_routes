import React from "react";
import Navigation from "./components/Navigation";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Car from "./components/Car";
import Login from "./components/Login";
import cookie from "cookie";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Check if someone has logged in
function checkAuth() {
  const cookies = cookie.parse(document.cookie);
  return cookies["loggedIn"] ? true : false;
}

// homebrew component that checked if someone logged in
// and redirect the user to the URL

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? ( // either true when the user is logged in or false when the user is logged out
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Switch>
        <Route path="/login" component={Login} />

        <ProtectedRoute component={Home} path="/" exact />
        <ProtectedRoute component={About} path="/about" />
        <ProtectedRoute component={Car} path="/car/:id" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
