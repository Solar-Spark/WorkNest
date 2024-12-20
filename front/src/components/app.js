import React from "react";
import "../styles/style.css"
import MainBlock from "./main_block"
import Header from "./header";
import Footer from "./footer";
import Auth from "./auth";
import {BrowserRouter, Routes, Route } from "react-router-dom"
class App extends React.Component{
  render(){
    return(
      <div id="app">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/auth/sign_up" element={<Auth title="Sign Up" state="sign_up"/>} />
              <Route path="/auth/sign_in" element={<Auth title="Sign in" state="sign_in"/>} />
              <Route path="/" element={<MainBlock title="My Tasks" />} />
            </Routes>
          </BrowserRouter>
          <Footer />
      </div>
    )
  }
}

export default App;
