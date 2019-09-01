import React from "react"
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core"
import { Pharmacy, Coordinate } from "../../appInterfaces"
import RPharmacyCard from "../../components/organisms/RPharmacyCard"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      margin: "auto"
    },
    listItem: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })

export interface StyleProps extends WithStyles<typeof styles> {}

interface HomeProps {
  submitCoordinate(lat: number, lng: number): void
  handleClickGoogleMap(lat: number, lng: number): void
  list: Pharmacy[]
}

interface HomeStates {}

class Home extends React.Component<StyleProps & HomeProps, HomeStates> {
  /**
   * It involves google maps instance
   */
  google: any
  inputSearchBox: any

  constructor(props: StyleProps & HomeProps) {
    super(props)
    this.google = (window as any).google
    this.inputSearchBox = React.createRef()
    this.setupInput = this.setupInput.bind(this)
  }

  /**
   * It builds input for realtime location search
   */
  setupInput() {
    const searchBox = new this.google.maps.places.SearchBox(
      this.inputSearchBox.current
    )
    searchBox.addListener("places_changed", () => {
      const list = searchBox.getPlaces()

      if (list.length === 0) {
        return
      }

      this.props.submitCoordinate(
        list[0].geometry.location.lat(),
        list[0].geometry.location.lng()
      )
    })
  }

  componentDidMount() {
    this.setupInput()
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <input
          type="text"
          style={{ width: "100%" }}
          ref={this.inputSearchBox}
        />
        {this.props.list.length === 0
          ? "Bu adrese en yakın Eczane bulunamadı"
          : this.props.list.map((item: Pharmacy, index) => (
              <div key={index} className={this.props.classes.listItem}>
                <RPharmacyCard
                  key={index}
                  name={item.name}
                  phone={item.phone}
                  address={item.address}
                  distance={item.distance}
                  lat={
                    item.location === undefined ? undefined : item.location.lat
                  }
                  lng={
                    item.location === undefined ? undefined : item.location.long
                  }
                  handleClickGoogleMaps={(lat: number, lng: number) => {
                    this.props.handleClickGoogleMap(lat, lng)
                  }}
                />
              </div>
            ))}
      </div>
    )
  }
}

export default withStyles(styles)(Home)
