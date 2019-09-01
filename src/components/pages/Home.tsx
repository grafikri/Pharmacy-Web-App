import React from "react"
import { default as HomeTemplate } from "../templates/Home"

class Home extends React.Component {
  state = {
    list: []
  }

  render() {
    return <HomeTemplate />
  }
}

export default Home
