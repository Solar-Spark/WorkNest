import React from "react";
import "../styles/style.css"
import Header from "./header";
import Footer from "./footer";
import Auth from "../pages/auth_page";
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import MyTasksPage from "../pages/my_tasks_page";
import MyProjectsPage from "../pages/my_projects_page";
class App extends React.Component{
  render(){
    return(
      <div id="app">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/auth/sign_up" element={<Auth title="Sign Up" component="sign_up"/>} />
              <Route path="/auth/sign_in" element={<Auth title="Sign in" component="sign_in"/>} />
              <Route path="/tasks" element={<MyTasksPage/>}/> 
              <Route path="/projects" element={<MyProjectsPage/>}/> 
              <Route path="/" element={<Navigate to="/tasks"/>}/>
            </Routes>
          </BrowserRouter>
          <Footer />
      </div>
    )
  }
}

export default App;
