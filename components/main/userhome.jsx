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

		return <div>{this.props.model.isGuest ? <UserGuest props={{user, model, guest}} /> : ''}</div>
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

export default Userhome
