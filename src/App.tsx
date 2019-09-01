import React from "react"
import logo from "./logo.svg"
//import "./App.css"
import { Theme, createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"

import Search from "./components/pages/Search"

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
        <Search />
      </ThemeProvider>
    </div>
  )
}

export default App
