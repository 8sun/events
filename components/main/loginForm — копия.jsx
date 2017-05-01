import React, { Component } from 'react'
import InputField from './loginInput';
import Avatar from './image';
import { Container, Grid, Image, Message, Header, Step } from 'semantic-ui-react'
import Crop from './crop2';
import { observer } from 'mobx-react';

@observer
class LoginForm extends Component {

	render() {
		return <Container>
			<Grid padded className="loginForm">
				<Grid.Row>
					<Grid.Column width={10}>
						<Header as='h1'>Sign in</Header>
						<Message color='blue'>
						 	<Header size='medium'>To view the event you just need to fill some fields</Header>
							Please, enter your name, add your photo and choose the language you need
						</Message>
				  
						<Step.Group stackable='tablet'>
							<Step active={this.props.model.file ? false : true} icon='picture' title='Avatar' description='Choose your avatar' />
							<Step active={this.props.model.file ? true : false} icon='signup' title='Name' description='Enter your name' />
						</Step.Group>

			        	{/* <Avatar model={this.props.model} /> */}
			        	<Crop model={this.props.model}/>
			        	{this.props.model.file ? (<InputField model={this.props.model}/>) : ''}
	        		</Grid.Column>
        		

	        		<Grid.Column width={6}>
	        			<h3>Some interesting events:</h3>
	        		</Grid.Column>
        		</Grid.Row>
        	</Grid>
    	</Container>;
	}
}

export default LoginForm
