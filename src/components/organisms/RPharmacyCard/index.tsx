import React from "react"
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core"
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: "red",
      margin: theme.spacing()
    }
  })

export interface StyleProps extends WithStyles<typeof styles> {}

class RPharmacyCard extends React.Component<StyleProps> {
  componentDidMount() {}

  render() {
    return (
      <div className={this.props.classes.root}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="h2">
              be lent
            </Typography>
            <Typography color="textSecondary">adjective</Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(RPharmacyCard)
