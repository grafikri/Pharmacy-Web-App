import React from "react"
import logo from "./logo.svg"
//import "./App.css"
import axios, { AxiosError } from "axios"
import { createMuiTheme, Typography, CircularProgress } from "@material-ui/core"
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
  state = {
    loading: true,
    message: ""
  }
  componentDidMount() {
    if (typeof Storage === "undefined") {
      this.setState({
        loading: false,
        message:
          "Daha güncel bir tarayıcı kullanmayı deneyin. Google Chrome, Safari yada Firefox'u deneyin."
      })
      return
    }

    // if (localStorage.getItem("pharmacies") !== null) {
    //   this.setState({
    //     loading: false
    //   })
    //   return
    // }

    axios
      .get(process.env.REACT_APP_API_URL!)
      .then(response => {
        localStorage.setItem("pharmacies", JSON.stringify(response.data.data))
      })
      .catch((error: AxiosError) => {
        this.setState({
          message: error.message
        })
      })
      .finally(() => {
        this.setState({
          loading: false
        })
      })
  }

  render() {
    const styleCenter = {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "25px"
    }

    return (
      <div
        className="App"
        style={{
          background: theme.palette.background.default,
          minHeight: "100vh"
        }}
      >
        <ThemeProvider theme={theme}>
          {this.state.loading ? (
            <div style={styleCenter}>
              <CircularProgress />
            </div>
          ) : (
            <div>
              {this.state.message == "" ? (
                <Router>
                  <Route exact path="/" component={Home} />
                  <Route
                    exact
                    path={["/search", "/search/:lat/:lng"]}
                    component={Search}
                  />
                </Router>
              ) : (
                <div style={styleCenter}>{this.state.message}</div>
              )}
            </div>
          )}
        </ThemeProvider>
      </div>
    )
  }
}

export default App
