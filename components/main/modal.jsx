import React, { Component } from 'react'
import { Popup, Button, Header, Image, Modal, Icon, Label } from 'semantic-ui-react'

class ModalExampleDimmer extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  accept = () => this.close

  deleteProfile = e => {
    const isSure = confirm(this.props.model.t["isSure"]);
    if(isSure) {
      this.props.model.unsubscribe();
    }
  }

  render() {
    const { open, dimmer } = this.state;
    let model = this.props.model;

    return (
      <div>
        <Popup trigger={<Button circular color="blue" onClick={this.show('blurring')} icon='settings' />}>
          <Popup.Header>Heads up!</Popup.Header>
          <Popup.Content>
            By default, a Modal closes when escape is pressed or when the dimmer is
            clicked. Setting the dimmer to "None" (dimmer={'{'}false{'}'}) means that there is no
            dimmer to click so clicking outside won't close the Modal. To close on
            outside click when there's no dimmer, you can pass the "closeOnDocumentClick" prop.
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
            <Modal.Description>
              <Header>Default Profile Image</Header>
              
              <Button animated='fade'>
                <Button.Content visible>{model.t['change_profile']}</Button.Content>
                <Button.Content hidden>
                  <Icon name='user circle outline' />
                </Button.Content>
              </Button>

              <Button animated='fade'>
                <Button.Content visible>{model.t['settings']}</Button.Content>
                <Button.Content hidden>
                  <Icon name='configure' />
                </Button.Content>
              </Button>

              <Button animated='fade' onClick={this.deleteProfile}>
                <Button.Content visible>{model.t['remove_profile']}</Button.Content>
                <Button.Content hidden>
                  <Icon name='remove user' />
                </Button.Content>
              </Button>

              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={this.accept} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalExampleDimmer