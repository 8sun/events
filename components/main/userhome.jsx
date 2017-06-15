import React, { Component } from 'react'
import { Container, Grid, Image, Button } from 'semantic-ui-react'
import Guest from './guest'
import User from './user'

import { observer } from 'mobx-react';

@observer
class Userhome extends Component {

	constructor(props) {
		super(props)
	}

	render() {

		const user = this.props.model.isUser
		const model = this.props.model
		const guest = {name: model.name, img: model.imgSrc}

		return <div>{this.props.model.isGuest ? <UserGuest props={{user, model, guest}} /> : <Buttons />}</div>
	}
}

const UserGuest = observer(({props}) =>
		<div className="userhome">
				{props.user
					? <User user={props.user} model={props.model} trigger={<img className="ava" src={props.model.imgSrc ? props.model.imgSrc : "/assets/images/avatar/small/matthew.png"} />}/>
					: <Guest user={props.guest} model={props.model} trigger={<img className="ava" src={props.model.imgSrc ? props.model.imgSrc : "/assets/images/avatar/small/matthew.png"} />}/>
				}
		</div>
)

const Buttons = observer(() =>
	<div>
		<div className="sign_in">
			<Button inverted color='orange'>sign in</Button>
			<p>Your personal profile<br/>for participating in events</p>
		</div>
		<div className="create_it">
			<Button inverted color='blue'>create it</Button>
			<p>Create an event<br/>by yourself</p>
		</div>
	</div>
)

export default Userhome
