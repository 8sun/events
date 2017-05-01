import React, { Component } from 'react'
import { Container, Grid, Image } from 'semantic-ui-react'
import UserModal from './modal';

class Userline extends Component {

	render() {

		let model = this.props.model;

		return <div className="userline">
			<Container>
				<Grid padded className="event">
					<Grid.Row>
			      		<Grid.Column width={12}>
							<img className="ava" src={model.imgSrc ? model.imgSrc : "/images/noavatar.png"} />
							{model.name}
						</Grid.Column>
						<Grid.Column width={4}>
							<UserModal model={model} />
						</Grid.Column>
			    	</Grid.Row>
				</Grid>
			</Container>
		</div>
	}
}

export default Userline
