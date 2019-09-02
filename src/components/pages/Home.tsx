import React from "react"
import { default as HomeTemplate } from "../templates/Home"
import { withRouter, RouteComponentProps } from "react-router"

class Home extends React.Component<RouteComponentProps> {
  render() {
    return (
      <HomeTemplate
        handleClickFindMyLocation={() => {
          navigator.geolocation.getCurrentPosition(
            position => {
              this.props.history.push(
                "/search/" +
                  position.coords.latitude +
                  "/" +
                  position.coords.longitude
              )
            },
            error => {
              console.log("e: ", error)
            }
          )
        }}
      />
    )
  }
}

export default withRouter(Home)
