import React from 'react';
import { observer } from 'mobx-react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, DropdownButton, MenuItem, ButtonToolbar, Checkbox } from 'react-bootstrap';

@observer
class Content extends React.Component {

	constructor(props) {
		super(props);
		this.M = this.props.Model;

		this.M.getTranslate();
		this.subscribers = [];

		this.state = {
    		inputEmail: false,
    		email: '',
    		subscribed: false,
    		isSubscribers: false,
    		inTheme: false,
    		error: "",
  		};


		const event_id = window.location.href.match(/\/event\/(\d+)\//)[1];
		this.M.event_id = event_id;
		this.isSubscribe();
		this.getSubscribers();
		this.M.getContentEvent(event_id);
	}

	deleteProfile = e => {
		const isSure = confirm(this.M.t["isSure"]);
		if(isSure) {
			this.M.unsubscribe();
		}
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
		var r = /^\w+@\w+\.\w{2,4}$/i;
		if (!r.test(this.state.email)) {
			return false;
		}
		return true;
	}

	subscribe = () => {
		if (!this.validateEmail()) {
			this.setState({ error: this.M.t['error_email'] });
			return;
		};

		const data = this.M.subscribe(this.state.email, this.state.inTheme);
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
		const data = this.M.isSubscribe();
		data.then(response => {
			if (response.isSubscribe) {
				this.setState({ subscribed: true });
			} else {
				this.setState({ subscribed: false });
			}
		});
	}

	getSubscribers = () => {
		const data = this.M.getSubscribers();
		data.then(response => {
			this.subscribers = JSON.parse(response.getSubscribers);
			this.setState({ isSubscribers: true });
		});
	}

	removeSubscriber = () => {
		const data = this.M.removeSubscriber();
		data.then(response => {
			if (response.removeSubscriber) {
				this.setState({ subscribed: false, inputEmail: true, inTheme: false, error: "" });
				this.getSubscribers();
			}
		});
	}

	renderSubscribes = () => {
		const listItems = this.subscribers.map((user) =>
		  <li key={user.user_id.toString()}>
		  {
		  	(user.img != "false") ? (
		  		<img className="pic" src={user.img} />
		  	) : (
		  		<img className="pic" src="/images/noavatar.png" />
	  		)
		  }
		  {user.name}
		  </li>
		);

		return <div>
			<ul className="subscribers">{listItems}</ul>
		</div>;
	}

	checked = event => {
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    
	    // const name = target.name;
	    // this.setState({
	    //   [name]: value
	    // });

		this.setState({ inTheme: value });
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

	renderForm = () => {
		return <div>
			<form>
				<FormGroup
					controlId="email"
					validationState={this.getValidationState()}
					>
					<ControlLabel>{this.M.t['text_for_email']}</ControlLabel>
					<FormControl
						type="email"
						value={this.state.email}
						placeholder={this.M.t['email_placeholder']}
						onChange={this.inputEmailChange}
					/>
					<FormControl.Feedback />
					<HelpBlock>{this.state.error}</HelpBlock>
				</FormGroup>
				<Checkbox value={this.state.inTheme} onChange={this.checked}>
			      {this.M.t['in_theme']}
			    </Checkbox>
				<Button bsStyle="primary" onClick={this.subscribe}>{this.M.t['ok']}</Button>
			</form>
		</div>;
	}

	content() {
		const cog = <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>;

		if (this.M.error) {
			let message = "Event not Found";
			return <div className="container">
					<h3>Page 404</h3>
					<h4><i>{message}</i></h4>
				</div>;
		} else {
			return <div className="wrapper">
				<div className="user">
					<div className="container">
						<div className="row">
							<div className="col-sm-10">
								<img className="ava" src={this.M.imgSrc ? this.M.imgSrc : "/images/noavatar.png"} />
								{this.M.name}
							</div>
							<div className="col-sm-2">
								<ButtonToolbar>
							    <DropdownButton bsStyle="default" title={cog} noCaret id="dropdown-no-caret">
							      <MenuItem eventKey="1">{this.M.t['change_profile']}</MenuItem>
							      <MenuItem eventKey="2">{this.M.t['settings']}</MenuItem>
							      <MenuItem divider />
							      <MenuItem eventKey="4" onClick={this.deleteProfile}>{this.M.t['remove_profile']}</MenuItem>
							    </DropdownButton>
							  </ButtonToolbar>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-sm-8">
							<h3>{this.M.t['hello']}</h3>
							<div className="content">
								<blockquote dangerouslySetInnerHTML={{__html: this.M.snippet.replace(/\[\$\]/g, this.M.name)}} />
								<h2 dangerouslySetInnerHTML={{__html: this.M.title}} />
								<div dangerouslySetInnerHTML={{__html: this.M.text.replace(/\[\$\]/g, this.M.name)}} />
			                    {!this.state.subscribed 
			                    	? (<div>
				                    		<hr />
				                    		<button className="btn btn-success" onClick={this.toTop}>{this.M.t['i_want']}</button>
				                    		<br /><br />
				                    		<div className="bg-success">
						                    	<small>{this.M.t['subscribe_description']}</small>
				                    		</div>
			                    		</div>)
			                    	: ''
								}
							</div>
					    </div>
					    <div className="col-sm-4">
					    	<br/>
					    	<h4>{this.M.t['subscribers']}</h4>
						    <div>{this.state.isSubscribers ? (this.renderSubscribes()) : ''}</div>
						    <div>
						    	{this.state.subscribed 
						    		? (<div id="is_subscribe">{this.M.t['is_subscribe']}<br/><button className="btn btn-danger" onClick={this.removeSubscriber}>{this.M.t['unsubscribe']}</button></div> )
						    		: (<div><button className="btn btn-success" id="inputEmail" onClick={this.showInputEmail}>{this.M.t['inputEmail']}</button><div className="arrow-top"></div></div>)}
						    </div>
							<div>{this.state.inputEmail ? (this.renderForm()) : ''}</div>
					    </div>
				    </div>
			    </div>
			</div>;
		}
	}

	render() {
		return (
			this.content()
		);
	}
};

export default Content;