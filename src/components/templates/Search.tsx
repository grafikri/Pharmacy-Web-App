import React from "react"

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Theme,
  createStyles,
  WithStyles
} from "@material-ui/core"
import { ArrowBack } from "@material-ui/icons"
import RPharmacySearch from "../organisms/RPharmacySearch"
import { withStyles } from "@material-ui/styles"
import { Pharmacy } from "../../appInterfaces"
import { Link } from "react-router-dom"
import RPharmacyCard from "../organisms/RPharmacyCard"

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: 1
    },
    barSpace: {
      height: "66px"
    },
    input: {
      marginLeft: theme.spacing(1),
      flexGrow: 1
    },
    listItem: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    listContainer: {
      maxWidth: "400px",
      padding: theme.spacing(2),
      margin: "auto"
    },
    backButtonLink: {
      padding: "inherit",
      color: "inherit",
      cursor: "inherit",
      textDecoration: "inherit",
      lineHeight: 0
    }
  })

interface Props {
  submitCoordinate(lat: number, lng: number): void
  handleClickGoogleMap(lat: number, lng: number): void
  handleClickDeletedSearch(): void
  list: Pharmacy[]
}

interface StyleProps extends WithStyles<typeof styles> {}

class Search extends React.Component<StyleProps & Props> {
  render() {
    return (
      <div>
        <AppBar position="fixed" className={this.props.classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Link to="/" className={this.props.classes.backButtonLink}>
                <ArrowBack />
              </Link>
            </IconButton>
            <div className={this.props.classes.input}>
              <RPharmacySearch
                submitCoordinate={(lat, lng) => {
                  this.props.submitCoordinate(lat, lng)
                }}
                handleClickGoogleMap={(lat, lng) => {
                  this.props.handleClickGoogleMap(lat, lng)
                }}
                handleClickDeletedSearch={() => {
                  this.props.handleClickDeletedSearch()
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={this.props.classes.barSpace}></div>
        <div className={this.props.classes.listContainer}>
          {this.props.list.length === 0 ? (
            <Typography color="textPrimary">
              Bu adrese en yakın Eczane bulunamadı.
            </Typography>
          ) : (
            this.props.list.map((item: Pharmacy, index) => (
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
            ))
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Search)
