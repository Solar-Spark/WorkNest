import React from "react";
import "./styles/style.css"
import MainBlock from "./components/main_block"
import Header from "./components/header";
import Footer from "./components/footer";
class App extends React.Component{
  render(){
    return(
      <div id="app">
          <Header />
          <MainBlock />
          <Footer />
      </div>
    )
  }
}

export default App;
