import React from "react"
import logo from "./logo.svg"
//import "./App.css"
import Home from "./components/Home"
import { Theme, createMuiTheme } from "@material-ui/core"

import { ThemeProvider } from "@material-ui/styles"
import { createClient } from "@google/maps"

const googleMaps = createClient({
  key: "AAA"
})

console.log("g: ", googleMaps)

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
})

const App: React.FC = () => {
  return (
    <div
      className="App"
      style={{
        background: theme.palette.background.default,
        minHeight: "100vh"
      }}
    >
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </div>
  )
}

export default App
