import React from "react"
import {
  WithStyles,
  Paper,
  IconButton,
  InputBase,
  Divider,
  Theme,
  createStyles,
  Zoom
} from "@material-ui/core"
import { Search, Directions, Close } from "@material-ui/icons"
import { withStyles } from "@material-ui/styles"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center"
    },
    input: {
      flexGrow: 1,
      paddingLeft: theme.spacing(2)
    }
  })

export interface StyleProps extends WithStyles<typeof styles> {}

interface Props {
  submitCoordinate(lat: number, lng: number, address: string): void
  handleClickGoogleMap(lat: number, lng: number): void
  handleClickDeletedSearch(): void
  autoFocus?: boolean
}

interface States {
  text: string
}

class RPharmacySearch extends React.Component<StyleProps & Props> {
  /**
   * It involves google maps instance
   */
  google: any
  inputSearchBox: any

  state = {
    text: ""
  }

  constructor(props: StyleProps & Props) {
    super(props)
    this.google = (window as any).google
    this.inputSearchBox = React.createRef()
    this.setupInput = this.setupInput.bind(this)
  }

  /**
   * It builds input for realtime location search
   */
  setupInput() {
    const searchBox = new this.google.maps.places.SearchBox(
      /**
       * Material UI creates new div instead of input to wrapper It,
       * So we had to select child node
       */
      this.inputSearchBox.current.children[0]
    )
    searchBox.addListener("places_changed", () => {
      const list = searchBox.getPlaces()

      if (list.length === 0) {
        return
      }

      const address = this.inputSearchBox.current.children[0].value

      this.setState({
        text: address
      })

      this.props.submitCoordinate(
        list[0].geometry.location.lat(),
        list[0].geometry.location.lng(),
        address
      )
    })
  }

  componentDidMount() {
    this.setupInput()
  }

  componentWillUpdate(nextProps: StyleProps & Props) {
    if (nextProps.autoFocus) {
      this.inputSearchBox.current.children[0].focus()
    }
  }

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <InputBase
          onChange={e => {
            this.setState({
              text: e.target.value
            })
            this.props.handleClickDeletedSearch()
          }}
          value={this.state.text}
          ref={this.inputSearchBox}
          className={this.props.classes.input}
          placeholder="Konumuzunu en yakın eczaneyi bulmak için bu alana bir adres girin"
          inputProps={{ "aria-label": "en yakın eczane" }}
        />

        <Zoom
          in={this.state.text.length === 0}
          style={{
            display: this.state.text.length !== 0 ? "none" : "inline-flex"
          }}
        >
          <IconButton
            aria-label="search"
            onClick={() => {
              this.inputSearchBox.current.children[0].focus()
            }}
          >
            <Search />
          </IconButton>
        </Zoom>
        <Zoom
          in={this.state.text.length !== 0}
          style={{
            display: this.state.text.length === 0 ? "none" : "inline-flex"
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => {
              this.setState({
                text: ""
              })
              this.props.handleClickDeletedSearch()
              this.inputSearchBox.current.children[0].focus()
            }}
          >
            <Close />
          </IconButton>
        </Zoom>
      </Paper>
    )
  }
}

export default withStyles(styles)(RPharmacySearch)
