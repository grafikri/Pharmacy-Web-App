import React from "react"
import { Typography, createStyles, Theme } from "@material-ui/core"
import RPharmacyCard from "../RPharmacyCard"
import { Pharmacy } from "../../../appInterfaces"
import { WithStyles, withStyles } from "@material-ui/styles"

const styles = (theme: Theme) =>
  createStyles({
    item: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })

interface Props {
  list: Pharmacy[]
  handleClickGoogleMap(lat: number, lng: number): void
}

interface StyleProps extends WithStyles<typeof styles> {}

class RPharmacyList extends React.Component<Props & StyleProps> {
  render() {
    return (
      <div>
        {this.props.list.map((item: Pharmacy, index) => (
          <div className={this.props.classes.item} key={index}>
            <RPharmacyCard
              key={index}
              name={item.name}
              phone={item.phone}
              address={item.address}
              distance={item.distance}
              lat={
                item.coordinate === undefined ? undefined : item.coordinate.lat
              }
              lng={
                item.coordinate === undefined ? undefined : item.coordinate.lng
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

export default withStyles(styles)(RPharmacyList)
