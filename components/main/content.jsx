import React from 'react';
import { observer } from 'mobx-react';
import Subscribers from './subscribers';
import Comments from './comments';
import { Container, Grid, Image, Button, Divider } from 'semantic-ui-react'
import Countdown from './countdown'


let model = {};

@observer
class Content extends React.Component {

	constructor(props) {
		super(props);

		model = this.props.model;

		this.snippet = '';
		this.text = '';
		this.title = '';
		this.start = '';


		model.getTranslate();
		this.state = {
    		subscribed: false,
  		};


		const event_id = window.location.href.match(/\/event\/(\d+)/)[1];
		this.getContent(event_id);

		this.error = null;
	}

	getContent = event_id => {
    	model.getContentEvent(event_id).then(result => {
				this.snippet = result.getContentEvent.snippet;
				this.start = result.getContentEvent.start;
				this.text = result.getContentEvent.text;
				this.title = result.getContentEvent.title;
		}, resolve => this.error = resolve);
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

	componentDidMount() {
		startMap()
	}

	render() {
		return <div>
			<Container>
				<Grid padded className="event">
					<Grid.Row>
						<Grid.Column mobile={16} tablet={16} computer={12}>
							<div className="content">
								<div dangerouslySetInnerHTML={{__html: this.snippet.replace(/\[\$\]/g, model.name) || this.snippet}} />
								{ /* <h2 dangerouslySetInnerHTML={{__html: this.title}} /> */ }
								<div dangerouslySetInnerHTML={{__html: this.text.replace(/\[\$\]/g, model.name) || this.text}} />
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
					    <Grid.Column mobile={16} tablet={16} computer={4}>
								{this.start
									? (<Countdown start={this.start} model={model} />)
									: ''
								}
					    	<Subscribers model={model} toggleSubscribed={this.toggleSubscribed} />
				    	</Grid.Column>
			    	</Grid.Row>
		  		</Grid>
			</Container>
		</div>;
	}
};

export default Content;
