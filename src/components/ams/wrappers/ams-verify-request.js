import React from "react"

import { Redirect } from "react-router-dom"

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "verify-request",
      urlArg: null,
      showInDirectory: false
    }
    state = {
      password: "",
      verify: ""
    }
    handleSubmit(e) {
      e.preventDefault();
      this.setState({ password: "", verify: "" });
      this.props.verifyRequest(this.props.urlArg, this.state.password);
    }
    render() {
      const { password, verify } = this.state,
        canSubmit = password && verify && (password === verify);

      if (this.props.user.authed) {
        return <Redirect to="/"/>
      }
      return (
        <Component { ...this.state } { ...this.props }
          canSubmit={ canSubmit }
          handleSubmit={ e => this.handleSubmit(e) }
          update={ u => this.setState(u) }/>
      )
    }
  }
