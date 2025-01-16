import React from "react";
import "../styles/style.css"
import Header from "./header/header";
import Footer from "./footer/footer";
import Auth from "../pages/auth_page";
import ProjectPage from "../pages/project_page";
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
              <Route path="/auth" element={<Auth/>} />
              <Route path="/tasks" element={<MyTasksPage/>}/> 
              <Route path="/projects" element={<MyProjectsPage/>}/>
              <Route path="/project" element={<ProjectPage/>}/>
              <Route path="/" element={<Navigate to="/tasks"/>}/>
            </Routes>
          </BrowserRouter>
          <Footer />
      </div>
    )
  }
}

export default App;
