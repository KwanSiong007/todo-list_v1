import "./App.css";
// "react-router-dom": This is the name of the library we are importing components and functions from. In this case, it's the React Router DOM library, which provides utilities for handling client-side routing in React applications.
//BrowserRouter: This is a type of router provided by the "react-router-dom" library. It helps manage the navigation and URLs in your React app.
//as Router: This renames the imported BrowserRouter component to be referred to as Router within this file. It's just for convenience and helps make the code cleaner.
//Link: This is a component from "react-router-dom" used to create links between different parts of your app. It's similar to the <a> HTML tag but tailored for React routing.
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import React from "react";
import Homepage from "./pages/Homepage";
import Work from "./pages/Work";
import Home from "./pages/Home";
import NewList from "./pages/NewList";

function App() {
  return (
    <>
      <Router>
        {/* <nav> Element: This is the navigation bar where you have three links, "Homepage", "Work", and "Home". 
    These links use the Link component from react-router-dom to handle navigation within the app. 
    When a link is clicked, it will navigate to the corresponding page without reloading the entire page. */}
        <nav>
          <ul>
            <li>
              {/* to="/": This is a prop (short for property) that you pass to the <Link> component. It specifies the destination where you want the link to take the user. In this case, it's set to /, which usually represents the homepage or root of your website. */}
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/work">Work</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/new-list">New List</Link>
            </li>
          </ul>
        </nav>
        {/* <Routes> Element: This element is used to define the routing configuration of the application. 
      Inside the <Routes> element, you define different <Route> elements that match specific paths and render specific components when those paths are accessed. */}
        <Routes>
          {/* <Route> Elements: Each <Route> element defines a mapping between a specific URL path and the component to be rendered when that path is accessed. */}
          {/* This line means that when the root URL ("/") is accessed, the Homepage
        component will be rendered. */}
          <Route path="/" element={<Homepage />} />
          <Route path="/work" element={<Work />} />
          <Route path="/home" element={<Home />} />
          <Route path="/new-list" element={<NewList />} />
          {/* The final <Route /> element without a path attribute serves as a catch-all route. If the user accesses a path that doesn't match any of the defined routes, the component within this <Route> element will be rendered. It can be used for implementing 404 error pages or fallback content. */}
          <Route />
        </Routes>
      </Router>
    </>
  );
}

export default App;
