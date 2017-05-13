import React, { Component } from 'react'
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react'

class GuestModal extends Component {

  constructor(props) {
    super(props);
  }

  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  deleteProfile = e => {
    const isSure = confirm(this.props.model.t["isSure"]);
    if(isSure) {
      this.props.model.exit();
    }
  }

  render() {
    const { open, dimmer } = this.state;
    const { user, model, trigger } = this.props;

    return (
      <div>
        <div onClick={this.show('blurring')}>{trigger}</div>
        <Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon='close'>
          <Modal.Header>Guest Information</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={user.img != "false" ? user.img : "/images/noavatar.png"} />
            <Modal.Description>
              <Header>Your name: {user.name}</Header>

                <div>
                <Button size='tiny' negative animated='fade' onClick={this.deleteProfile}>
                  <Button.Content visible>{model.t['remove_profile']}</Button.Content>
                  <Button.Content hidden>
                    <Icon name='remove user' />
                  </Button.Content>
                </Button>
              </div>

            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>Close</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default GuestModal