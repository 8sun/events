import React, { Component } from 'react'
import InputField from './loginInput';
import Avatar from './image';
import { Container, Grid, Image, Message, Header, Step, Divider, Icon } from 'semantic-ui-react'
import Crop from './crop2';
import SignIn from './signIn';
import { observer } from 'mobx-react';

@observer
class LoginForm extends Component {

	render() {
		return <Container>
			<Grid padded className="loginForm">
				<Grid.Row>
					<Grid.Column width={10}>
						<Header as='h2'><Icon name='sign in' /> Sign in</Header>
					 	<Header size='medium'>To view the event you just need to fill some fields</Header>
						Please, enter your name, add your photo and choose the language you need
						<Divider />
						<Step.Group stackable='tablet'>
							<Step active={this.props.model.skip ? false : true} icon='picture' title='Avatar' description='Choose your avatar' />
							<Step active={this.props.model.skip ? true : false} icon='signup' title='Name' description='Enter your name' />
						</Step.Group>

			        	{/* <Avatar model={this.props.model} /> */}

			        	<div className="slider">
			        		<div className={this.props.model.skip ? 'crop crop-hide': 'crop'} >
			        			<Crop model={this.props.model}/>
			        		</div>
			        		<div className={this.props.model.skip ? 'name': 'name name-hide'} >
			        			<InputField model={this.props.model} />
			        		</div>
		        		</div>

	        		</Grid.Column>


	        		<Grid.Column width={6}>
								<Header as='h2'><Icon name='reply' /> Recover me</Header>
								<p>Was you used the subscribe already?</p>
								<p>Ok. Then you just might enter your email via you had been subscribed early</p>
								<Message color='orange'>
		        			<SignIn model={this.props.model} />
								</Message>
	        		</Grid.Column>
        		</Grid.Row>
        	</Grid>
    	</Container>;
	}
}

export default LoginForm
