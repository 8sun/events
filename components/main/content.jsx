import React from 'react';
import { observer } from 'mobx-react';
import Subscribers from './subscribers';
import Userline from './userline';
import Comments from './comments';
import { Container, Grid, Image, Button, Divider } from 'semantic-ui-react'

let model = {};

@observer
class Content extends React.Component {

	constructor(props) {
		super(props);

		model = this.props.model;

		model.getTranslate();
		this.state = {
    		subscribed: false,
  		};


		const event_id = window.location.href.match(/\/event\/(\d+)/)[1];
		model.event_id = event_id;
		model.getContentEvent(event_id);
	}

	toTop = () => {
		window.scrollTo(0, 0);

		const inputEmail = document.getElementById("inputEmail");
		const className = "colorize";
		const className2 = "arrow-top-show";
		const arrow = document.querySelector('.arrow-top');
		
		if (inputEmail.classList) {
		  inputEmail.classList.add(className);
		  arrow.classList.add(className2);
		}
		else {
		  inputEmail.className += ' ' + className;
		  arrow.className2 += ' ' + className2;
		}

		setTimeout(() => {
			arrow.style.display = 'none';
		}, 1000);

	}

	toggleSubscribed = (value) => {
		this.setState({ subscribed: value });
	}

	render() {
		return <div>
			<Userline model={model} />
			<Container>
				<Grid padded className="event">
					<Grid.Row>
						<Grid.Column width={12}>
							<h3>{model.t['hello']}</h3>
							<div className="content">
								<blockquote dangerouslySetInnerHTML={{__html: model.snippet.replace(/\[\$\]/g, model.name)}} />
								<h2 dangerouslySetInnerHTML={{__html: model.title}} />
								<div dangerouslySetInnerHTML={{__html: model.text.replace(/\[\$\]/g, model.name)}} />
			                    {!this.state.subscribed 
			                    	? (<div>
				                    		<Divider />
				                    		<Button color="orange" onClick={this.toTop}>{model.t['i_want']}</Button>
				                    		<br /><br />
				                    		<div className="bg-success">
						                    	<small>{model.t['subscribe_description']}</small>
				                    		</div>
			                    		</div>)
			                    	: ''
								}
								<Comments model={model}/>
							</div>
					    </Grid.Column>
					    <Grid.Column width={4}>
					    	<Subscribers model={model} toggleSubscribed={this.toggleSubscribed} />
				    	</Grid.Column>
			    	</Grid.Row>
		  		</Grid>
			</Container>
		</div>;
	}
};

export default Content;