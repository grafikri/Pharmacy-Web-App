import React from "react"
import logo from "./logo.svg"
//import "./App.css"
import Home from "./components/Home"
import { Theme, createMuiTheme } from "@material-ui/core"
import RPharmacyCard from "./components/organisms/RPharmacyCard"

import { ThemeProvider } from "@material-ui/styles"

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
})

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RPharmacyCard />
      </ThemeProvider>
    </div>
  )
}

export default App
