import React from "react"
import logo from "./logo.svg"
//import "./App.css"
import axios from "axios"
import { createMuiTheme, Typography } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Search from "./components/pages/Search"
import Home from "./components/pages/Home"

const theme = createMuiTheme({
  palette: {
    type: "light"
  },
  typography: {
    h1: {
      fontSize: "1.5rem"
    }
  }
})

class App extends React.Component {
  componentDidMount() {
    if (typeof Storage === "undefined") {
      // App will never start.
      return
    }

    if (localStorage.getItem("pharmacies") === null) {
      axios
        .get(
          "https://us-central1-pharmacy-251220.cloudfunctions.net/getIstanbul"
        )
        .then(response => {
          localStorage.setItem("pharmacies", JSON.stringify(response.data.data))
        })
        .catch(error => {
          console.log("e: ", error)
        })
    }
  }

  render() {
    return (
      <Router>
        <div
          className="App"
          style={{
            background: theme.palette.background.default,
            minHeight: "100vh"
          }}
        >
          <ThemeProvider theme={theme}>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path={["/search", "/search/:lat/:lng"]}
              component={Search}
            />
          </ThemeProvider>
        </div>
      </Router>
    )
  }
}

export default App
