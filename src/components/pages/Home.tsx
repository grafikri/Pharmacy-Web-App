import React from "react"
import { default as HomeTemplate } from "../templates/Home"
import { withRouter, RouteComponentProps } from "react-router"

class Home extends React.Component<RouteComponentProps> {
  state = {
    locationFinding: false,
    locationFindingMessage: "",
    locationDetectError: false,
    locationDetectErrorMessage: ""
  }

  async startFindLocation() {
    this.setState({
      locationFinding: true,
      locationFindingMessage: "Konuma izin vermeniz bekleniyor..."
    })

    const position = await this.getLoaction()
    this.setState({
      locationFindingMessage: "İzin alındı, konum alınıyor..."
    })
    await this.wait()
    this.setState({
      locationFindingMessage: "Konum alındı. Yönlendiriliyorsunuz..."
    })
    await this.wait()
    this.props.history.push(
      "/search/" +
        (position as any).coords.latitude +
        "/" +
        (position as any).coords.longitude
    )
  }

  wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }

  getLoaction() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position)
        },
        error => {
          reject(error)
        }
      )
    })
  }

  render() {
    return (
      <HomeTemplate
        loactionDetectError={this.state.locationDetectError}
        loactionDetectErrorMessage={this.state.locationDetectErrorMessage}
        handleClickLoactionDetectError={() => {
          this.props.history.push("/search")
        }}
        locationFinding={this.state.locationFinding}
        locationFindingMessage={this.state.locationFindingMessage}
        handleClickFindMyLocation={() => {
          this.startFindLocation().catch(
            (error: { code: number; message: string }) => {
              let message: string =
                error.code == 1
                  ? "Konuma izin vermediğiniz için işlem yapamıyoruz."
                  : "Konumunuz tespit edilemedi."
              message = message.concat(
                " Devam ederek belirteceğiniz adrese göre en yakın nöbetçi eczaneleri görebilirsiniz."
              )

              this.setState({
                locationFinding: false,
                locationDetectError: true,
                locationDetectErrorMessage: message
              })
            }
          )
        }}
      />
    )
  }
}

export default withRouter(Home)
