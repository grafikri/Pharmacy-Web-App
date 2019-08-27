import React from "react"
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: "red"
    }
  })

export interface StyleProps extends WithStyles<typeof styles> {}

class RPharmacyCard extends React.Component<StyleProps> {
  componentDidMount() {}

  render() {
    return <div className={this.props.classes.root}>Card</div>
  }
}

export default withStyles(styles)(RPharmacyCard)
