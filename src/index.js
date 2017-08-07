import React, { Component, PropTypes } from "react"
import { BackHandler, Platform } from "react-native"
import withSideEffect from "react-side-effect"

let listener = null
let backButtonPressFunction = () => false

class AndroidBackButton extends Component {

  componentDidMount() {
    if (Platform.OS === "android" && listener === null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        return backButtonPressFunction()
      })
    }
  }

  render() {
    return null
  }
}

AndroidBackButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

function reducePropsToState(propsList) {
  const defaultValue = () => false
  const lastComponent = propsList[propsList.length - 1]
  return (lastComponent && lastComponent.onPress) || defaultValue
}

function mapStateOnServer(callback) {
  backButtonPressFunction = callback
  return backButtonPressFunction
}

export default withSideEffect(
  reducePropsToState,
  () => {},
  mapStateOnServer
)(AndroidBackButton)
