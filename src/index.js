import React, { Component } from "react"
import { BackAndroid, Platform } from "react-native"
import withSideEffect from "react-side-effect"
import PropTypes from "prop-types";

let listener = null
let backButtonPressFunction = () => false

class AndroidBackButton extends Component {

  componentDidMount() {
    if (Platform.OS === "android" && listener === null) {
      listener = BackAndroid.addEventListener("hardwareBackPress", () => {
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
