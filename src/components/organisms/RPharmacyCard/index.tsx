import React from "react"
import clsx from "clsx"
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  Avatar
} from "@material-ui/core"
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core"
import { Phone, LocationOn } from "@material-ui/icons"

const styles = (theme: Theme) =>
  createStyles({
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    iconSmall: {
      fontSize: 20
    },
    actions: {
      display: "flex",
      alignItems: "center"
    },
    distance: {
      fontSize: 14,
      marginTop: theme.spacing(0.8)
    }
  })

export interface StyleProps extends WithStyles<typeof styles> {}

class RPharmacyCard extends React.Component<
  StyleProps & {
    name: string
    address?: string
    phone?: string
    distance?: string
    lat?: number
    lng?: number
    handleClickGoogleMaps(lat: number, lng: number): void
  }
> {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title={
              <div>
                <Typography>{this.props.name + " Eczanesi"}</Typography>
                <Typography>
                  {this.props.phone == null
                    ? "Telefon numarası bulunmuyor"
                    : this.props.phone}
                </Typography>
              </div>
            }
            action={
              <Typography
                variant="subtitle1"
                className={this.props.classes.distance}
              >
                {this.props.distance}
              </Typography>
            }
            subheader={
              this.props.address == null
                ? "Adres bulunmuyor"
                : this.props.address
            }
            avatar={<Avatar>{this.props.name.substr(0, 1)}</Avatar>}
          ></CardHeader>
          <CardActions className={this.props.classes.actions}>
            <Button
              disabled={this.props.phone ? false : true}
              href={"tel: " + this.props.phone}
              fullWidth
              variant="contained"
              color="primary"
            >
              <Phone
                className={clsx(
                  this.props.classes.leftIcon,
                  this.props.classes.iconSmall
                )}
              />
              {this.props.phone ? "Ara" : "Bulunmuyor"}
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                if (
                  this.props.lat !== undefined &&
                  this.props.lng !== undefined
                ) {
                  this.props.handleClickGoogleMaps(
                    this.props.lat,
                    this.props.lng
                  )
                }
              }}
            >
              <LocationOn
                className={clsx(
                  this.props.classes.leftIcon,
                  this.props.classes.iconSmall
                )}
              />
              Google
            </Button>
            {/* <Button fullWidth variant="contained" color="primary">
              <LocationOn
                className={clsx(
                  this.props.classes.leftIcon,
                  this.props.classes.iconSmall
                )}
              />
              Yandex
            </Button> */}
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(RPharmacyCard)
