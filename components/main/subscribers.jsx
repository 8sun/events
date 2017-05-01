import React, { Component } from 'react'
import { Container, Grid, Image, Form, Message, Feed, Icon, Button } from 'semantic-ui-react'
import timeAgo from "time-ago"
const ta = timeAgo(); 

let model = {};

class  Subscribers extends Component {

	constructor(props) {
		super(props);

		model = this.props.model;

		model.getContent();

		model.getTranslate();
		this.subscribers = [];

		this.state = {
    		inputEmail: false,
    		email: '',
    		subscribed: false,
    		isSubscribers: false,
    		inTheme: "false",
    		error: "",
  		};

		const event_id = window.location.href.match(/\/event\/(\d+)/)[1];
		model.event_id = event_id;
		this.isSubscribe();
		this.getSubscribers();
	}

	showInputEmail = () => {
		this.setState({
			inputEmail: true
		});
	}

	getValidationState = () => {
		const length = this.state.email.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
	}

	inputEmailChange = e => {
		this.setState({ email: e.target.value });
	}

	validateEmail = () => {
		var r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!r.test(this.state.email)) {
			return false;
		}
		return true;
	}

	subscribe = (event) => {

		event.preventDefault();

		if (!this.validateEmail()) {
			this.setState({ error: model.t['error_email'] });
			return;
		};

		const data = model.subscribe(this.state.email, JSON.parse(this.state.inTheme));
		data.then(response => {
			const subscribe = JSON.parse(response.subscribe);
			if (subscribe['error']) {
				this.setState({ error: subscribe['error'] });
			} else {
				this.setState({ subscribed: true, inputEmail: false });
				this.getSubscribers();
			}
		});
	}

	isSubscribe = () => {
		const data = model.isSubscribe();
		data.then(response => {
			if (response.isSubscribe) {
				this.setState({ subscribed: true });
			} else {
				this.setState({ subscribed: false });
			}
		});
	}

	getSubscribers = () => {
		const data = model.getSubscribers();
		data.then(response => {
			this.subscribers = JSON.parse(response.getSubscribers);
			this.setState({ isSubscribers: true });
		});
	}

	removeSubscriber = () => {
		const data = model.removeSubscriber();
		data.then(response => {
			if (response.removeSubscriber) {
				this.setState({ subscribed: false, inputEmail: true, inTheme: "false", error: "" });
				this.getSubscribers();
			}
		});
	}

	checked = event => {
		const target = event.target.previousElementSibling;
	    const value = target.value === 'false' ? 'true' : 'false';
	    
	    // const name = target.name;
	    // this.setState({
	    //   [name]: value
	    // });

		this.setState({ inTheme: value });
	}

	renderForm = () => {
		return (
	      <Form>
	        <Form.Group widths='equal'>
	          <Form.Input value={this.state.email} label={model.t['text_for_email']} placeholder={model.t['email_placeholder']} onChange={this.inputEmailChange} />
	        </Form.Group>
	        <Form.Checkbox label={model.t['in_theme']} value={this.state.inTheme} onChange={this.checked} />
	        {this.state.error
	           ? (<Message negative>
				    <Message.Header>Error</Message.Header>
				    <p>{this.state.error}</p>
				  </Message>)
	           : ""}
	        <Form.Button onClick={this.subscribe}>{model.t['ok']}</Form.Button>
	      </Form>
    	)
	}

	renderSubscribes = () => {
		const listItems = this.subscribers.map((user) =>
			 <Feed.Event key={user.user_id.toString()}>
		      <Feed.Label image={user.img != "false" ? user.img : "/images/noavatar.png"} />
		      <Feed.Content>
		        <Feed.Date>{ta.ago(new Date(user.created))}</Feed.Date>
		        <Feed.Summary>
		          You added <a>{user.name}</a> to your <a>coworker</a> group.
		        </Feed.Summary>
		      </Feed.Content>
		    </Feed.Event>
		);

		return <div>
			<Feed>{listItems}</Feed>
		</div>;
	}

	componentWillUpdate(nextProps, nextState) {
		if(this.state !== nextState) {
			this.props.toggleSubscribed(this.state.subscribed)
		}
	}

	render() {
		return <div className="col-sm-4">
	    	<br/>
	    	<h4>{model.t['subscribers']}</h4>
		    <div>{this.state.isSubscribers ? (this.renderSubscribes()) : ''}</div>
		    <div>
		    	{this.state.subscribed 
		    		? (<div id="is_subscribe">{model.t['is_subscribe']}<br/><Button secondary onClick={this.removeSubscriber}>{model.t['unsubscribe']}</Button></div> )
		    		: (<div><Button color="orange" id="inputEmail" onClick={this.showInputEmail}>{model.t['inputEmail']}</Button><div className="arrow-top"></div></div>)}
		    </div>
			<div>{this.state.inputEmail ? (this.renderForm()) : ''}</div>
	    </div>;
	}
}

export default Subscribers
