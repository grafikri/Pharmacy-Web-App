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
    }
  })

export interface StyleProps extends WithStyles<typeof styles> {}

interface HomeStates {}

class Home extends React.Component<StyleProps, HomeStates> {
  render() {
    return <div>home</div>
  }
}

export default withStyles(styles)(Home)
