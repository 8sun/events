import React, { Component } from 'react'
import { Container, Grid, Image, Button } from 'semantic-ui-react'
import Guest from './guest';
import User from './user';

const Userline = ({ model }) => {
	
	const guest = {name: model.name, img: model.imgSrc}
	const user = model.isUser;

	return (
	  	<div className="userline">
			<Container>
				<Grid padded className="event">
					<Grid.Row>
			      		<Grid.Column width={12}>
							<img className="ava" src={model.imgSrc ? model.imgSrc : "/images/noavatar.png"} />
							{model.name}
						</Grid.Column>
						<Grid.Column width={4}>
							{user
								? (<User user={user} model={model} trigger={<Button circular color="blue" icon='settings' />}/>)
								: (<Guest user={guest} model={model} trigger={<Button circular color="blue" icon='settings' />}/>)
							}
						</Grid.Column>
			    	</Grid.Row>
				</Grid>
			</Container>
		</div>
	)
}

export default Userline
