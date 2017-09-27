import React, { Component } from "react"
import PropTypes from 'prop-types'
import { AppState, BackAndroid, Platform } from "react-native"
import withSideEffect from "react-side-effect"

var listener = null
var backButtonPressFunction = () => false

class AndroidBackButton extends Component {
  componentDidMount() {
    if (Platform.OS === "android") {
      AppState.addEventListener('change', state => {
        if (state == 'background') {
          listener = null;
        }
      })
    }

    if (Platform.OS === "android" && listener === null) {
      listener = BackAndroid.addEventListener("hardwareBackPress", () => {
        return backButtonPressFunction()
      })      
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android" && listener !== null) {
      BackAndroid.removeEventListener('hardwareBackPress', listener);
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
