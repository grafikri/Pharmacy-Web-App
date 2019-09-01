import React from "react"
import { distance } from "../../helpers"
import { Pharmacy, Coordinate } from "../../appInterfaces"

import { default as SearchTemplate } from "../templates/Search"
import datas from "../../pharmacies.json"
import _ from "lodash"

class Search extends React.Component {
  state = {
    list: []
  }

  constructor(props: {}) {
    super(props)
    this.calculatesLocations = this.calculatesLocations.bind(this)
  }

  /**
   * It brings new locations depend on coordinate
   *
   * @param lat latitue
   * @param lng longitude
   */
  calculatesLocations(lat: number, lng: number) {
    const pharmacies: Pharmacy[] = datas.data.map(item => {
      const location: Coordinate =
        item.konum == null
          ? {}
          : { lat: +item.konum.split(",")[0], long: +item.konum!.split(",")[1] }
      return {
        name: item.eczane_adi,
        location,
        address: item.eczane_ilce + " - " + item.eczane_adres,
        phone: item.phone
      }
    })

    let radius = 15
    let locations = pharmacies.map(item => ({
      ...item,
      distance: distance(
        lat,
        lng,
        item.location == null ? 0 : item.location.lat!,
        item.location == null ? 0 : item.location.long!,
        "K"
      )
    }))

    const myLocations = locations.filter(item => item.distance < radius)
    const orderedMyLocations = _.orderBy(myLocations, ["distance"], ["asc"])

    const myLocationsWithDistance: Pharmacy[] = orderedMyLocations.map(
      item => ({
        ...item,
        distance: item.distance
          .toString()
          .substr(0, 4)
          .concat(" km")
      })
    )

    this.setState({
      list: myLocationsWithDistance
    })
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
          this.calculatesLocations(lat, lng)
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
