import datas from "./pharmacies.json"
import { Pharmacy, Coordinate } from "./appInterfaces.js"
import _ from "lodash"

/**
 * This function taken from -> https://www.geodatasource.com/developers/javascript
 * This function provides to calculate the distance between two points
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @param unit
 */
export function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: string
) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0
  } else {
    var radlat1 = (Math.PI * lat1) / 180
    var radlat2 = (Math.PI * lat2) / 180
    var theta = lon1 - lon2
    var radtheta = (Math.PI * theta) / 180
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
      dist = dist * 1.609344
    }
    if (unit == "N") {
      dist = dist * 0.8684
    }
    return dist
  }
}

/**
 * It brings new locations depend on coordinate
 *
 * @param lat latitue
 * @param lng longitude
 */
export function calculatesLocations(lat: number, lng: number): Pharmacy[] {
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

  const myLocationsWithDistance: Pharmacy[] = orderedMyLocations.map(item => ({
    ...item,
    distance: item.distance
      .toString()
      .substr(0, 4)
      .concat(" km")
  }))

  return myLocationsWithDistance
}
