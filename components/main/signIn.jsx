import React, { Component } from 'react'
import { Form, Message, Loader } from 'semantic-ui-react'

class SignIn extends Component {

  state = {email:"", error: "", ok: "", loader: false}
  inputHandleChange = (e, { value }) => this.setState({ email: value })

  handleClick = e => {
    e.preventDefault();

    this.setState({ loader: true });

    if (this.state.email) {

      if (!this.validateEmail()) {
        this.setState({ error: "Error: Email is invalid" });
        return;
      };

      const recovery = this.props.model.recovery(this.state.email);
      recovery.then(res => {
        if (res.send == true) {
          this.setState({ ok: "Activation link has been sent to your email", error: "", email:"", loader: false });
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
    const { email, error, ok, loader } = this.state;
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input label='Email' name="email" placeholder='Email' value={email} onChange={this.inputHandleChange} />
        </Form.Group>
        <Form.Button content='Send' positive onClick={this.handleClick} />
        {error
          ? (<Message negative>
            <Message.Header>Error</Message.Header>
            <p>{error}</p>
            </Message>)
          : ""
        }
        {ok
          ? <Message header='Your request has been sent to you email' content={ok} />
          : ""
        }
        {loader
          ? <Loader active inline />
          : ''
        }
      </Form>
    )
  }
}

export default SignIn
