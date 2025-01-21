import React from "react";
import "../styles/style.css"
import Header from "./header/header";
import Footer from "./footer/footer";
import Auth from "../pages/auth_page";
import ProjectPage from "../pages/project_page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import MyTasksPage from "../pages/my_tasks_page";
import MyTeamsPage from "../pages/my_teams_page";
import TeamPage from "../pages/team_page";
import MyProjectsPage from "../pages/my_projects_page";
import ServerErrorPage from "../pages/server_error_page";

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
              <Route path="/project" element={sessionStorage.getItem("project_id") ? <ProjectPage/> : <Navigate to="/tasks"/>}/>
              <Route path="/teams" element={<MyTeamsPage/>}/> 
              <Route path="/team" element={sessionStorage.getItem("team_id") ? <TeamPage/> : <Navigate to="/tasks"/>}/> 
              <Route path="/" element={<Navigate to="/tasks"/>}/>
              <Route path="/server-error" element={<ServerErrorPage/>}/>
            </Routes>
          </BrowserRouter>
          <Footer />
      </div>
    )
  }
}

export default App;
