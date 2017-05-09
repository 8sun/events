import date from "date-and-time"
import React, { Component } from 'react'
import { Button, Header, Image, Modal, Icon, Segment } from 'semantic-ui-react'

class UserModal extends Component {

	constructor(props) {
		super(props);
	}

  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  deleteProfile = e => {
    const isSure = confirm(this.props.model.t["isSure"]);
    if(isSure) {
      this.props.model.unsubscribe();
    }
  }

  render() {
    const { open, dimmer } = this.state;
    const { user, model, trigger } = this.props;
    //date.locale('ru');

    return (
      <div>
        <div onClick={this.show('blurring')}>{trigger}</div>
        <Modal dimmer={dimmer} open={open} onClose={this.close} closeIcon='close'>
          <Modal.Header>Profile Information</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={user.img != "false" ? user.img : "/images/noavatar.png"} />
            <Modal.Description>
              <Header>User: {user.name}</Header>

              <p>Events subscribed: {user.subscribeCount}</p>
              <p>Comments: {user.commentsCount}</p>
              <p>On site since: {date.format(new Date(user.firstDate), 'DD MMMM YYYY')}</p>

              {model.user_id === user.user_id ? 
                
                (<div>
                  <Button size='tiny' primary animated='fade'>
                    <Button.Content visible>{model.t['change_profile']}</Button.Content>
                    <Button.Content hidden>
                      <Icon name='user circle outline' />
                    </Button.Content>
                  </Button>

                  <Button size='tiny' negative animated='fade' onClick={this.deleteProfile}>
                    <Button.Content visible>{model.t['remove_profile']}</Button.Content>
                    <Button.Content hidden>
                      <Icon name='remove user' />
                    </Button.Content>
                  </Button>

                  <Segment color='red'><b>Note</b> that if you remove your profile you also delete all your comments and your subscribes!</Segment>

                </div>) : ''}

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

export default UserModal