import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';

@observer
class InputField extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			inputvalue: '',
			selectvalue: 0,
		};
		this.getValidationState = this.getValidationState.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	getValidationState() {
		const length = this.state.inputvalue.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
	}

	handleChange(e) {
		this.setState({ inputvalue: e.target.value });
	}

	handleSelectChange(e) {
		this.setState({ selectvalue: e.target.value });
	}

	handleClick(e) {
		if (this.state.inputvalue) {
			this.props.Model.enter(this.state.inputvalue, this.state.selectvalue);
		}
	}

	render() {
		return (
			<form>
				<FormGroup
					controlId="formBasicText"
					validationState={this.getValidationState()}
					>
					<ControlLabel>Name and surname</ControlLabel>
					<FormControl
						type="text"
						value={this.state.inputvalue}
						placeholder="John Smith"
						onChange={this.handleChange}
					/>
					<FormControl.Feedback />
					<HelpBlock>You should correctly enter your name and surname so that your friends recognize you</HelpBlock>
				</FormGroup>
				<FormGroup controlId="formControlsSelect">
			      <ControlLabel>Interface language</ControlLabel>
			      <FormControl componentClass="select" onChange={this.handleSelectChange} value={this.state.selectvalue} placeholder="select">
			        <option value="0">English</option>
			        <option value="1">Русский</option>
			        <option value="2">Українська</option>
			      </FormControl>
			    </FormGroup>
				<Button bsStyle="primary" onClick={this.handleClick}>Ok</Button>
			</form>
			);
	}
};

export default InputField;