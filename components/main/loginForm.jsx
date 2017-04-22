import React, { Component } from 'react'
import InputField from './loginInput';
import Avatar from './image';
import { Container, Grid, Image, Message, Header } from 'semantic-ui-react'

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
			        	<Avatar Model={this.props.Model} />
			        	<InputField Model={this.props.Model}/>
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
