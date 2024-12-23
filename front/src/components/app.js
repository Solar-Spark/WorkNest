import React from "react";
import "../styles/style.css"
import MainBlock from "./main_block"
import Header from "./header";
import Footer from "./footer";
import Auth from "../pages/auth_page";
import {BrowserRouter, Routes, Route } from "react-router-dom"
import MyTasksPage from "../pages/my_tasks_page";
class App extends React.Component{
  render(){
    return(
      <div id="app">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/auth/sign_up" element={<Auth title="Sign Up" state="sign_up"/>} />
              <Route path="/auth/sign_in" element={<Auth title="Sign in" state="sign_in"/>} />
              <Route path="tasks" element={<MyTasksPage />}/> 
              <Route path="/" />
            </Routes>
          </BrowserRouter>
          <Footer />
      </div>
    )
  }
}

export default App;
