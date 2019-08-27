import React from "react"
import logo from "./logo.svg"
//import "./App.css"
import Home from "./components/Home"
import RPharmacyCard from "./components/organisms/RPharmacyCard"

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Home /> */}
      <RPharmacyCard />
    </div>
  )
}

export default App
