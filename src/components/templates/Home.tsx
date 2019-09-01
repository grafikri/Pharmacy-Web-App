import React from "react"
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core"
import { Pharmacy, Coordinate } from "../../appInterfaces"
import RPharmacyCard from "../../components/organisms/RPharmacyCard"
import RPharmacySearch from "../organisms/RPharmacySearch"

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
  render() {
    return (
      <div className={this.props.classes.root}>
        <RPharmacySearch
          submitCoordinate={(lat, lng) => {
            this.props.submitCoordinate(lat, lng)
          }}
          handleClickGoogleMap={(lat, lng) => {
            this.props.handleClickGoogleMap(lat, lng)
          }}
          handleClickDeletedSearch={() => {}}
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
