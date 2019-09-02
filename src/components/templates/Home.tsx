import React from "react"
import {
  Theme,
  WithStyles,
  withStyles,
  createStyles,
  Typography,
  Button
} from "@material-ui/core"
import { MyLocation, Directions } from "@material-ui/icons"
import { Link } from "react-router-dom"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      minHeight: "100vh",
      alignItems: "center"
    },
    paper: {
      padding: theme.spacing(3),
      margin: theme.spacing(1)
    },
    buttonIcon: {
      marginBottom: theme.spacing(1)
    },
    reactRouterLinkDefault: {
      padding: "inherit",
      color: "inherit",
      cursor: "inherit",
      textDecoration: "inherit",
      lineHeight: 0
    }
  })

export interface StyleProps extends WithStyles<typeof styles> {}

interface Props {
  handleClickFindMyLocation(): void
}
interface States {}

class Home extends React.Component<Props & StyleProps, States> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Button
          onClick={() => {
            this.props.handleClickFindMyLocation()
          }}
          size="large"
          variant="contained"
          color="primary"
          className={this.props.classes.paper}
        >
          <div>
            <MyLocation className={this.props.classes.buttonIcon} />
            <Typography variant="h5" component="h3">
              Konum
            </Typography>
          </div>
        </Button>

        <Link
          to="/search"
          className={this.props.classes.reactRouterLinkDefault}
        >
          <Button
            size="large"
            variant="contained"
            color="primary"
            className={this.props.classes.paper}
          >
            <div>
              <Directions className={this.props.classes.buttonIcon} />
              <Typography variant="h5" component="h3">
                Adres
              </Typography>
            </div>
          </Button>
        </Link>
      </div>
    )
  }
}

export default withStyles(styles)(Home)
