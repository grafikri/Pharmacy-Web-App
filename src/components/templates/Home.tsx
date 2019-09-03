import React from "react"
import {
  Theme,
  WithStyles,
  withStyles,
  createStyles,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
  LinearProgress
} from "@material-ui/core"
import { ArrowForwardOutlined, Directions } from "@material-ui/icons"
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
    arrow: {
      marginLeft: theme.spacing(2)
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
  locationFinding: boolean
  locationFindingMessage: string
  loactionDetectError: boolean
  loactionDetectErrorMessage: string
  handleClickLoactionDetectError(): void
}
interface States {
  locationDialogOpen: boolean
}

class Home extends React.Component<Props & StyleProps, States> {
  state = {
    locationDialogOpen: false
  }
  render() {
    return (
      <div className={this.props.classes.root}>
        {/* It will being shown when location detect is fail */}
        <Dialog
          onClose={() => {}}
          aria-labelledby="customized-dialog-title"
          open={this.props.loactionDetectError}
        >
          <DialogContent dividers>
            <Typography gutterBottom>
              {this.props.loactionDetectErrorMessage}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.props.handleClickLoactionDetectError()
              }}
              color="primary"
            >
              Devam Et
            </Button>
          </DialogActions>
        </Dialog>

        {/* Shows detect location information */}
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={this.props.locationFinding}
        >
          <DialogContent dividers>
            <Typography gutterBottom>
              {this.props.locationFindingMessage}
            </Typography>
            <LinearProgress />
          </DialogContent>
        </Dialog>

        {/* Prewarning for location request */}
        <Dialog
          onClose={() => {}}
          aria-labelledby="customized-dialog-title"
          open={this.state.locationDialogOpen}
        >
          <DialogContent dividers>
            <Typography gutterBottom>
              Konum izni istenecektir. Onay vermelisiniz.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({
                  locationDialogOpen: false
                })
                this.props.handleClickFindMyLocation()
              }}
              color="primary"
            >
              Tamam
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          onClick={() => {
            this.setState({
              locationDialogOpen: true
            })
          }}
          size="large"
          variant="contained"
          color="primary"
        >
          <Typography variant="h5" component="h3">
            En yakın nöbetçi eczaneleri getir
          </Typography>
          <ArrowForwardOutlined className={this.props.classes.arrow} />
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Home)
