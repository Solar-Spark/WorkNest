import React from "react";
import "./styles/style.css"
import MainBlock from "./components/main_block"
import Header from "./components/header";
import Footer from "./components/footer";
import Auth from "./components/auth";
import {BrowserRouter, Routes, Route } from "react-router-dom"
class App extends React.Component{
  render(){
    return(
      <div id="app">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<MainBlock title="My Tasks" />} />
            </Routes>
          </BrowserRouter>
          <Footer />
      </div>
    )
  }
}

export default App;
