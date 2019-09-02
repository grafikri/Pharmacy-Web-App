import React from "react"
import { distance, calculatesLocations } from "../../helpers"
import { Pharmacy, Coordinate } from "../../appInterfaces"

import { default as SearchTemplate } from "../templates/Search"

import _ from "lodash"

class Search extends React.Component {
  state = {
    list: []
  }

  navigateToGoogleMaps(lat: number, lng: number) {
    const originLat = 40.24043
    const originLng = 29.00893

    const targetLat = lat
    const targetLng = lng

    const url =
      "http://maps.google.com/maps?saddr=" +
      originLat +
      "," +
      originLng +
      "&daddr=" +
      targetLat +
      "," +
      targetLng +
      "&mode=driving"
    window.open(url, "_blank")
  }

  render() {
    return (
      <SearchTemplate
        submitCoordinate={(lat, lng) => {
          this.setState({
            list: calculatesLocations(lat, lng)
          })
        }}
        handleClickGoogleMap={(lat, lng) => {
          this.navigateToGoogleMaps(lat, lng)
        }}
        handleClickDeletedSearch={() => {
          this.setState({
            list: []
          })
        }}
        list={this.state.list}
      />
    )
  }
}

export default Search
