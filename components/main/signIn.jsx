import React, { Component } from 'react'
import { Form, Message } from 'semantic-ui-react'

class SignIn extends Component {

  state = {email:"", error: "", ok: ""}
  inputHandleChange = (e, { value }) => this.setState({ email: value })

  handleClick = e => {
    e.preventDefault();
    if (this.state.email) {

      if (!this.validateEmail()) {
        this.setState({ error: "Error: Email is invalid" });
        return;
      };

      const recovery = this.props.model.recovery(this.state.email);
      recovery.then(res => {
        if (res.send == true) {
          this.setState({ ok: "Token has been sent to your email", error: "", email:"" });
        } else {
          this.setState({ error: "Error: Email is invalid", ok: "", email:"" });
        }
      });
    }
  }

  validateEmail = () => {
    var r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!r.test(this.state.email)) {
      return false;
    }
    return true;
  }

  render() {
    const { email, error, ok } = this.state;
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input label='Email' name="email" placeholder='Email' value={email} onChange={this.inputHandleChange} />
        </Form.Group>
        <Form.Button content='Enter' positive onClick={this.handleClick} />
        {error
          ? (<Message negative>
            <Message.Header>Error</Message.Header>
            <p>{error}</p>
            </Message>)
          : ""}
        {ok
          ? <Message header='Your request has been sent to you email' content={ok} />
          : ""}
      </Form>
    )
  }
}

export default SignIn