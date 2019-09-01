import React from "react"
import logo from "./logo.svg"
//import "./App.css"
import { Theme, createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"

import Home from "./components/pages/Home"

import RPharmacySearch from "./components/organisms/RPharmacySearch"

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
        {/* <Home /> */}
        <div style={{ padding: "15px" }}>
          <RPharmacySearch
            handleClickGoogleMap={(lat, lng) => {
              console.log("google click: ", lat, lng)
            }}
            submitCoordinate={(lat, lng) => {
              console.log("submit coordinate: ", lat, lng)
            }}
          />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
