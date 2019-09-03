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
  Box,
  CircularProgress
} from "@material-ui/core"
import { ArrowBack } from "@material-ui/icons"
import RPharmacySearch from "../organisms/RPharmacySearch"
import { withStyles } from "@material-ui/styles"
import { Pharmacy } from "../../appInterfaces"
import { Link } from "react-router-dom"
import RPharmacyCard from "../organisms/RPharmacyCard"
import { withRouter } from "react-router-dom"
import RPharmacyList from "../organisms/RPharmacyList"

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: 1
    },
    circular: {
      marginTop: theme.spacing(3),
      textAlign: "center"
    },
    barSpace: {
      height: "66px"
    },
    input: {
      marginLeft: theme.spacing(1),
      flexGrow: 1
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
      marginTop: theme.spacing(3)
    }
  })

interface Props {
  submitCoordinate(lat: number, lng: number, address: string): void
  handleClickGoogleMap(lat: number, lng: number): void
  handleClickDeletedSearch(): void
  autoFocusSearch?: boolean
  address: string
  list: Pharmacy[]
  message: string
  loading: boolean
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
                autoFocus={this.props.autoFocusSearch}
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

        {this.props.loading ? (
          <div className={this.props.classes.circular}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            {this.props.list.length !== 0 ? (
              <Typography
                align="center"
                variant="h1"
                className={this.props.classes.address}
              >
                {this.props.address} adresine en yakın nöbetçi eczaneler
              </Typography>
            ) : (
              ""
            )}

            {this.props.message.length === 0 ? (
              ""
            ) : (
              <Typography className={this.props.classes.address} align="center">
                {this.props.message}
              </Typography>
            )}

            <div className={this.props.classes.listContainer}>
              <RPharmacyList
                list={this.props.list}
                handleClickGoogleMap={this.props.handleClickGoogleMap}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Search)
