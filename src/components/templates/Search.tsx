import React from "react"

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Theme,
  createStyles,
  WithStyles,
  Box
} from "@material-ui/core"
import { ArrowBack } from "@material-ui/icons"
import RPharmacySearch from "../organisms/RPharmacySearch"
import { withStyles } from "@material-ui/styles"
import { Pharmacy } from "../../appInterfaces"
import { Link } from "react-router-dom"
import RPharmacyCard from "../organisms/RPharmacyCard"
import { withRouter } from "react-router-dom"

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
      padding: 0,
      color: "inherit",
      cursor: "inherit",
      textDecoration: "inherit",
      lineHeight: 0
    },
    address: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2)
    }
  })

interface Props {
  submitCoordinate(lat: number, lng: number, address: string): void
  handleClickGoogleMap(lat: number, lng: number): void
  handleClickDeletedSearch(): void
  address: string
  list: Pharmacy[]
}

interface StyleProps extends WithStyles<typeof styles> {}

class Search extends React.Component<StyleProps & Props> {
  render() {
    return (
      <div>
        <AppBar position="fixed" className={this.props.classes.appBar}>
          <Toolbar>
            <Link to="/" className={this.props.classes.backButtonLink}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <ArrowBack />
              </IconButton>
            </Link>
            <div className={this.props.classes.input}>
              <RPharmacySearch
                submitCoordinate={(lat, lng, address) => {
                  this.props.submitCoordinate(lat, lng, address)
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
        {this.props.list.length === 0 ? (
          ""
        ) : (
          <Typography
            align="center"
            variant="h1"
            className={this.props.classes.address}
          >
            {this.props.address} yakınlarında nöbetçi eczaneler
          </Typography>
        )}

        <div className={this.props.classes.listContainer}>
          {this.props.list.length === 0 ? (
            <Typography color="textPrimary">
              Bu adrese en yakın Eczane bulunamadı.
            </Typography>
          ) : (
            <div>
              {this.props.list.map((item: Pharmacy, index) => (
                <div key={index} className={this.props.classes.listItem}>
                  <RPharmacyCard
                    key={index}
                    name={item.name}
                    phone={item.phone}
                    address={item.address}
                    distance={item.distance}
                    lat={
                      item.location === undefined
                        ? undefined
                        : item.location.lat
                    }
                    lng={
                      item.location === undefined
                        ? undefined
                        : item.location.lng
                    }
                    handleClickGoogleMaps={(lat: number, lng: number) => {
                      this.props.handleClickGoogleMap(lat, lng)
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Search)
