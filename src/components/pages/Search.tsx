import React from "react"
import { distance, calculatesLocations } from "../../helpers"
import { Pharmacy, Coordinate } from "../../appInterfaces"

import { default as SearchTemplate } from "../templates/Search"

import _ from "lodash"
import { RouteComponentProps, withRouter } from "react-router"

class Search extends React.Component<RouteComponentProps> {
  state = {
    list: [],
    address: ""
  }
  componentDidMount() {
    const params = this.props.match.params
    if (!_.isEmpty(params)) {
      const coordinate: Coordinate = {
        lat: +(this.props.match.params as any).lat,
        lng: +(this.props.match.params as any).lng
      }

      this.updateViewWithCoordinateAndAddress(coordinate)
    }
  }

  updateViewWithCoordinateAndAddress(coordinate: Coordinate, address?: string) {
    this.getPlaceDetailsFromCoordinate(coordinate)
      .then(placeDetails => {
        this.setState({
          list: calculatesLocations(placeDetails.coordinate),
          address: address == undefined ? placeDetails.placeName : address
        })
      })
      .catch(error => {
        console.log("e: ", error)
      })
  }

  getPlaceDetailsFromCoordinate(
    coordinate: Coordinate
  ): Promise<{
    coordinate: Coordinate
    placeName: string
  }> {
    const google = (window as any).google
    const request = {
      location: new google.maps.LatLng({ ...coordinate }),
      rankBy: google.maps.places.RankBy.DISTANCE,
      type: "point_of_interest"
    }
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    )

    return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results: any, status: any) => {
        if (results.length === 0) {
          reject("Kordinatlara yakın bir yer bulunamadı.")
          return
        }

        resolve({
          coordinate: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          },
          placeName: results[0].vicinity
        })
      })
    })
  }

  navigateToGoogleMaps(lat: number, lng: number) {
    const originLat = +(this.props.match.params as any).lat
    const originLng = +(this.props.match.params as any).lng

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
        address={this.state.address}
        submitCoordinate={(lat, lng, address) => {
          this.props.history.push("/search/" + lat + "/" + lng)
          this.updateViewWithCoordinateAndAddress({ lat, lng }, address)
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

export default withRouter(Search)
